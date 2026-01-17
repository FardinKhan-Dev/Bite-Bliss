export default {
    async search(ctx) {
        try {
            const { q, category, maxCookingTime, page = 1, pageSize = 12 } = ctx.query;
            const subscriptionTier = ctx.state.subscriptionTier || 0;

            // Build filters
            const filters = {};

            // Text search in title and description
            if (q) {
                filters.$or = [
                    { title: { $containsi: q } },
                    { description: { $containsi: q } },
                ];
            }

            // Category filter
            if (category) {
                filters.category = {
                    name: { $eqi: category }
                };
            }

            // Cooking time filter
            if (maxCookingTime) {
                filters.cookingTime = { $lte: parseInt(maxCookingTime) };
            }

            // Filter based on subscription tier
            // Tier 0 (free): only free recipes
            // Tier 1 (premium): free + premium
            // Tier 2 (VIP): all recipes
            if (subscriptionTier === 0) {
                filters.isPremium = false;
            }

            // Fetch recipes
            const recipes = await strapi.documents('api::recipe.recipe').findMany({
                filters,
                populate: ['image', 'category'],
                sort: { createdAt: 'desc' },
                start: (page - 1) * pageSize,
                limit: pageSize,
            });

            // Count total
            const total = await strapi.documents('api::recipe.recipe').count({
                filters,
            });

            ctx.body = {
                data: recipes,
                meta: {
                    pagination: {
                        page: parseInt(page),
                        pageSize: parseInt(pageSize),
                        pageCount: Math.ceil(total / pageSize),
                        total,
                    },
                },
            };
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async getFilters(ctx) {
        try {
            // Get all categories
            const categories = await strapi.documents('api::category.category').findMany({
                sort: { name: 'asc' },
            });

            // Get min/max cooking times
            const recipes = await strapi.db.query('api::recipe.recipe').findMany({
                select: ['cookingTime'],
            });

            const cookingTimes = recipes
                .map(r => r.cookingTime)
                .filter(t => t != null);

            const minCookingTime = cookingTimes.length > 0 ? Math.min(...cookingTimes) : 0;
            const maxCookingTime = cookingTimes.length > 0 ? Math.max(...cookingTimes) : 120;

            ctx.body = {
                categories: categories.map(c => ({ id: c.id || c.documentId, name: c.name })),
                cookingTimeRange: {
                    min: minCookingTime,
                    max: maxCookingTime,
                },
            };
        } catch (error) {
            ctx.throw(500, error);
        }
    },
};
