module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/analytics/dashboard',
            handler: 'analytics.getDashboard',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
        {
            method: 'GET',
            path: '/analytics/revenue',
            handler: 'analytics.getRevenue',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
        {
            method: 'GET',
            path: '/analytics/subscribers',
            handler: 'analytics.getSubscribers',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
        {
            method: 'GET',
            path: '/analytics/content',
            handler: 'analytics.getContent',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
    ],
};
