export default {
    async preview(ctx) {
        const { documentId } = ctx.params;

        try {
            // Get recipe including draft content
            const recipe = await strapi.documents('api::recipe.recipe').findOne({
                documentId,
                status: 'draft', // Get draft version
                populate: {
                    category: true,
                    image: true,
                },
            });

            if (!recipe) {
                return ctx.notFound('Recipe not found');
            }

            return recipe;
        } catch (error) {
            console.error('Preview error:', error);
            return ctx.internalServerError('Failed to load preview');
        }
    },
};
