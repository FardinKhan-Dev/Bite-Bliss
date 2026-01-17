module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/subscriptions/checkout',
            handler: 'subscription.createCheckout',
            config: {
                auth: {
                    scope: ['api'],
                },
            },
        },
        {
            method: 'POST',
            path: '/subscriptions/portal',
            handler: 'subscription.createPortal',
            config: {
                auth: {
                    scope: ['api'],
                },
            },
        },
        {
            method: 'GET',
            path: '/subscriptions/me',
            handler: 'subscription.getMySubscription',
            config: {
                auth: {
                    scope: ['api'],
                },
            },
        },
        {
            method: 'POST',
            path: '/subscriptions/cancel',
            handler: 'subscription.cancel',
            config: {
                auth: {
                    scope: ['api'],
                },
            },
        },
    ],
};
