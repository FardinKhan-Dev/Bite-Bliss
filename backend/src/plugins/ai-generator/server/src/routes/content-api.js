export default {
    type: 'content-api',
    routes: [
        {
            method: 'POST',
            path: '/generate',
            handler: 'generator.generate',
            config: {
                policies: ['plugin::ai-generator.is-authorized'],
                auth: {
                    scope: ['admin'],
                },
            },
        },
    ],
};
