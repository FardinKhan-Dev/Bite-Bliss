// @ts-nocheck
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
    /**
     * Create Stripe Checkout Session for subscription
     */
    async createCheckoutSession(user, priceId, successUrl, cancelUrl) {
        try {
            // Get or create Stripe customer
            let customerId = user.stripeCustomerId;

            if (!customerId) {
                const customer = await stripe.customers.create({
                    email: user.email,
                    metadata: {
                        userId: user.id.toString(),
                    },
                });
                customerId = customer.id;

                // Update user with customer ID
                await strapi.documents('plugin::users-permissions.user').update({
                    documentId: user.documentId,
                    data: { stripeCustomerId: customerId },
                });
            }

            // Create checkout session
            const session = await stripe.checkout.sessions.create({
                customer: customerId,
                mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                success_url: successUrl,
                cancel_url: cancelUrl,
                metadata: {
                    userId: user.id.toString(),
                },
            });

            return session;
        } catch (error) {
            console.error('Stripe checkout error:', error);
            throw error;
        }
    },

    /**
     * Create Stripe Customer Portal Session
     */
    async createPortalSession(customerId, returnUrl) {
        try {
            const session = await stripe.billingPortal.sessions.create({
                customer: customerId,
                return_url: returnUrl,
            });

            return session;
        } catch (error) {
            console.error('Stripe portal error:', error);
            throw error;
        }
    },

    /**
     * Cancel subscription
     */
    async cancelSubscription(subscriptionId) {
        try {
            const subscription = await stripe.subscriptions.update(subscriptionId, {
                cancel_at_period_end: true,
            });

            return subscription;
        } catch (error) {
            console.error('Stripe cancel error:', error);
            throw error;
        }
    },

    /**
     * Get subscription details
     */
    async getSubscription(subscriptionId) {
        try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            return subscription;
        } catch (error) {
            console.error('Stripe get subscription error:', error);
            throw error;
        }
    },
};
