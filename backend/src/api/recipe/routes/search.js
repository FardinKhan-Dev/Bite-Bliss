module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/recipes/search',
            handler: 'search.search',
            config: {
                middlewares: ['global::check-subscription'],
                auth: false, // Allow unauthenticated users to search
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
    ],
};
