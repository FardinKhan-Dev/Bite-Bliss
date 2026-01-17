export default {
    routes: [
        {
            method: 'GET',
            path: '/subscription-plans',
            handler: 'subscription-plan.find',
            config: {
                auth: false, // Allow public access
            },
        },
        {
            method: 'GET',
            path: '/subscription-plans/:id',
            handler: 'subscription-plan.findOne',
            config: {
                auth: false, // Allow public access
            },
        },
        {
            method: 'POST',
            path: '/subscription-plans',
            handler: 'subscription-plan.create',
            config: {
                auth: false, // Temporarily allow public - should be admin only in production
            },
        },
    ],
};
