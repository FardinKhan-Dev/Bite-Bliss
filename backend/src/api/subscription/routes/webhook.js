export default {
    routes: [
        {
            method: 'POST',
            path: '/webhook/stripe',
            handler: 'webhook.webhook',
            config: {
                auth: false,
                policies: [],
            },
        },
    ],
};
