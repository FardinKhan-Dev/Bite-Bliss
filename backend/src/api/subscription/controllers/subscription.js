import stripeService from '../services/stripe.js';

export default {
    /**
     * Create checkout session
     */
    async createCheckout(ctx) {
        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized('You must be logged in');
            }

            const { priceId } = ctx.request.body;

            if (!priceId) {
                return ctx.badRequest('Price ID is required');
            }

            const baseUrl = process.env.CLIENT_URL || 'http://localhost:3000';
            const successUrl = `${baseUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`;
            const cancelUrl = `${baseUrl}/subscription`;

            const session = await stripeService.createCheckoutSession(
                user,
                priceId,
                successUrl,
                cancelUrl
            );

            return { sessionId: session.id, url: session.url };
        } catch (error) {
            console.error('Checkout error:', error);
            return ctx.internalServerError('Failed to create checkout session');
        }
    },

    /**
     * Create customer portal session
     */
    async createPortal(ctx) {
        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized('You must be logged in');
            }

            if (!user.stripeCustomerId) {
                return ctx.badRequest('No subscription found');
            }

            const baseUrl = process.env.CLIENT_URL || 'http://localhost:3000';
            const returnUrl = `${baseUrl}/account/subscription`;

            const session = await stripeService.createPortalSession(
                user.stripeCustomerId,
                returnUrl
            );

            return { url: session.url };
        } catch (error) {
            console.error('Portal error:', error);
            return ctx.internalServerError('Failed to create portal session');
        }
    },

    /**
     * Get current user's subscription
     */
    async getMySubscription(ctx) {
        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized('You must be logged in');
            }

            const subscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
                where: { user: user.id },
                populate: { plan: true },
            });

            if (!subscription) {
                // Return free plan info
                const freePlan = await strapi.db.query('api::subscription-plan.subscription-plan').findOne({
                    where: { tier: 0 },
                });

                return {
                    plan: freePlan,
                    status: 'free',
                    isActive: true,
                };
            }

            return subscription;
        } catch (error) {
            console.error('Get subscription error:', error);
            return ctx.internalServerError('Failed to get subscription');
        }
    },

    /**
     * Cancel subscription
     */
    async cancel(ctx) {
        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized('You must be logged in');
            }

            const subscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
                where: { user: user.id },
            });

            if (!subscription || !subscription.stripeSubscriptionId) {
                return ctx.badRequest('No active subscription found');
            }

            await stripeService.cancelSubscription(subscription.stripeSubscriptionId);

            // Update in database
            await strapi.documents('api::user-subscription.user-subscription').update({
                documentId: subscription.documentId,
                data: { cancelAtPeriodEnd: true },
            });

            return { message: 'Subscription will be canceled at the end of the billing period' };
        } catch (error) {
            console.error('Cancel subscription error:', error);
            return ctx.internalServerError('Failed to cancel subscription');
        }
    },
};
