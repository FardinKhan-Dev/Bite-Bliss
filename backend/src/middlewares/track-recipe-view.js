export default (config, { strapi }) => {
    return async (ctx, next) => {
        // Only track views for recipe detail page (not list)
        if (ctx.params.documentId) {
            try {
                const { documentId } = ctx.params;

                // Increment view count
                const recipe = await strapi.db.query('api::recipe.recipe').findOne({
                    where: { documentId },
                });

                if (recipe) {
                    await strapi.documents('api::recipe.recipe').update({
                        documentId,
                        data: {
                            viewCount: (recipe.viewCount || 0) + 1,
                        },
                    });
                }
            } catch (error) {
                console.error('Failed to track recipe view:', error);
                // Don't block the request if tracking fails
            }
        }

        await next();
    };
};
