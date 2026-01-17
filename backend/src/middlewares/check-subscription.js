module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
        const user = ctx.state.user;

        if (!user) {
            // Not logged in - free tier (tier 0)
            ctx.state.subscriptionTier = 0;
            ctx.state.subscription = null;
            return await next();
        }

        try {
            // Get user's subscription
            const subscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
                where: {
                    user: user.id,
                    status: 'active'
                },
                populate: { plan: true },
            });

            if (!subscription || !subscription.plan) {
                // No active subscription - free tier
                ctx.state.subscriptionTier = 0;
                ctx.state.subscription = null;
            } else {
                // Has active subscription
                ctx.state.subscriptionTier = subscription.plan.tier;
                ctx.state.subscription = subscription;
            }

            await next();
        } catch (error) {
            console.error('Subscription middleware error:', error);
            // Default to free tier on error
            ctx.state.subscriptionTier = 0;
            ctx.state.subscription = null;
            await next();
        }
    };
};
