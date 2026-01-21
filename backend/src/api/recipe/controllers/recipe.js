module.exports = {
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

        // Fetch recipes using entity service
        const recipes = await strapi.documents('api::recipe.recipe').findMany({
            ...ctx.query,
            populate: ctx.query.populate || '*',
        });

        // Add subscription info to response
        return {
            data: recipes,
            meta: {
                subscriptionTier,
            },
        };
    },

    async findOne(ctx) {
        const { subscriptionTier = 0 } = ctx.state;
        const { documentId } = ctx.params;

        // Get the recipe using entity service
        const recipe = await strapi.documents('api::recipe.recipe').findOne({
            documentId,
            populate: '*',
        });

        if (!recipe) {
            return ctx.notFound('Recipe not found');
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
        return { data: recipe };
    },
};
