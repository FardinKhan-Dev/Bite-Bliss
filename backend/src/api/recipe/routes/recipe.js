module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/recipes',
            handler: 'recipe.find',
            config: {
                middlewares: ['global::check-subscription'],
            },
        },
        {
            method: 'GET',
            path: '/recipes/:documentId',
            handler: 'recipe.findOne',
            config: {
                middlewares: ['global::check-subscription', 'global::track-recipe-view'],
            },
        },
    ],
};
