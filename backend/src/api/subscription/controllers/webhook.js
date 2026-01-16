import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default {
    async webhook(ctx) {
        const sig = ctx.request.headers['stripe-signature'];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                ctx.request.body[Symbol.for('unparsedBody')],
                sig,
                webhookSecret
            );
        } catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            ctx.status = 400;
            return { error: 'Webhook signature verification failed' };
        }

        console.log('Stripe webhook event:', event.type);

        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    await handleCheckoutCompleted(event.data.object);
                    break;

                case 'customer.subscription.updated':
                    await handleSubscriptionUpdated(event.data.object);
                    break;

                case 'customer.subscription.deleted':
                    await handleSubscriptionDeleted(event.data.object);
                    break;

                case 'invoice.payment_failed':
                    await handlePaymentFailed(event.data.object);
                    break;

                default:
                    console.log(`Unhandled event type: ${event.type}`);
            }

            ctx.status = 200;
            return { received: true };
        } catch (error) {
            console.error('Webhook handler error:', error);
            ctx.status = 500;
            return { error: 'Webhook handler failed' };
        }
    },
};

async function handleCheckoutCompleted(session) {
    const userId = session.metadata.userId;
    const subscriptionId = session.subscription;

    // Get subscription details
    // @ts-ignore - Stripe types issue
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;

    // Find the subscription plan by Stripe price ID
    const plan = await strapi.db.query('api::subscription-plan.subscription-plan').findOne({
        where: {
            $or: [
                { stripePriceId: priceId },
                { stripeYearlyPriceId: priceId },
            ],
        },
    });

    if (!plan) {
        console.error('No plan found for price ID:', priceId);
        return;
    }

    // Check if user subscription already exists
    const existingSubscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
        where: { user: userId },
    });

    if (existingSubscription) {
        // Update existing
        await strapi.documents('api::user-subscription.user-subscription').update({
            documentId: existingSubscription.documentId,
            data: {
                plan: plan.documentId,
                stripeCustomerId: session.customer,
                stripeSubscriptionId: subscriptionId,
                status: 'active',
                // @ts-ignore - Stripe subscription properties
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                // @ts-ignore - Stripe subscription properties
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
        });
    } else {
        // Create new
        await strapi.documents('api::user-subscription.user-subscription').create({
            data: {
                user: userId,
                plan: plan.documentId,
                stripeCustomerId: session.customer,
                stripeSubscriptionId: subscriptionId,
                status: 'active',
                // @ts-ignore - Stripe subscription properties
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                // @ts-ignore - Stripe subscription properties
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end,
                publishedAt: new Date(),
            },
        });
    }

    console.log(`Subscription activated for user ${userId}`);

    // Send subscription confirmation email
    try {
        const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: { id: userId },
        });

        if (user) {
            await strapi.service('api::email.email').sendSubscriptionConfirmation(user, plan);

            // Also send payment receipt
            const amount = subscription.items.data[0].price.unit_amount;
            await strapi.service('api::email.email').sendPaymentReceipt(user, amount, plan);
        }
    } catch (emailError) {
        console.error('Failed to send subscription emails:', emailError);
    }
}

async function handleSubscriptionUpdated(subscription) {
    const userSubscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
        where: { stripeSubscriptionId: subscription.id },
    });

    if (!userSubscription) {
        console.error('No subscription found for:', subscription.id);
        return;
    }

    await strapi.documents('api::user-subscription.user-subscription').update({
        documentId: userSubscription.documentId,
        data: {
            status: subscription.status,
            // @ts-ignore - Stripe subscription properties
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            // @ts-ignore - Stripe subscription properties
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
    });

    console.log(`Subscription updated:`, subscription.id);
}

async function handleSubscriptionDeleted(subscription) {
    const userSubscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
        where: { stripeSubscriptionId: subscription.id },
    });

    if (!userSubscription) {
        console.error('No subscription found for:', subscription.id);
        return;
    }

    await strapi.documents('api::user-subscription.user-subscription').update({
        documentId: userSubscription.documentId,
        data: {
            status: 'canceled',
            canceledAt: new Date(),
        },
    });

    console.log(`Subscription canceled:`, subscription.id);
}

async function handlePaymentFailed(invoice) {
    const subscriptionId = invoice.subscription;

    const userSubscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
        where: { stripeSubscriptionId: subscriptionId },
    });

    if (!userSubscription) {
        return;
    }

    await strapi.documents('api::user-subscription.user-subscription').update({
        documentId: userSubscription.documentId,
        data: {
            status: 'past_due',
        },
    });

    console.log(`Payment failed for subscription:`, subscriptionId);
}
