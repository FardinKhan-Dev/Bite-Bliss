export default {
    async find(ctx) {
        const { subscriptionTier = 0 } = ctx.state;

        // Free tier (0): Only show free recipes
        if (subscriptionTier === 0) {
            ctx.query = {
                ...ctx.query,
                filters: {
                    ...ctx.query.filters,
                    isPremium: false,
                },
            };
        }

        // Premium (tier 1) and Chef's Circle (tier 2): Show all recipes
        // No additional filtering needed

        // Call default controller
        const { data, meta } = await super.find(ctx);

        // Add subscription info to response
        return {
            data,
            meta: {
                ...meta,
                subscriptionTier,
            },
        };
    },

    async findOne(ctx) {
        const { subscriptionTier = 0 } = ctx.state;

        // Get the recipe
        const response = await super.findOne(ctx);
        const recipe = response.data;

        if (!recipe) {
            return response;
        }

        // If recipe is premium and user is on free tier, return locked version
        if (recipe.isPremium && subscriptionTier === 0) {
            return {
                data: {
                    ...recipe,
                    // Lock the content
                    ingredients: null,
                    instructions: null,
                    // Add flags
                    isLocked: true,
                    upgradeRequired: true,
                    upgradeMessage: 'Subscribe to Premium or Chef\'s Circle to access this recipe',
                },
            };
        }

        // Return full recipe
        return response;
    },
};
