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
        // Search routes
        {
            method: 'GET',
            path: '/recipes/search',
            handler: 'search.search',
            config: {
                middlewares: ['global::check-subscription'],
                auth: false,
            },
        },
        {
            method: 'GET',
            path: '/recipes/filters',
            handler: 'search.getFilters',
            config: {
                auth: false,
            },
        },
        // Preview route
        {
            method: 'GET',
            path: '/recipes/preview/:documentId',
            handler: 'preview.preview',
            config: {
                middlewares: ['global::check-subscription'],
            },
        },
    ],
};
