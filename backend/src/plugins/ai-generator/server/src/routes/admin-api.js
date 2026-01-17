module.exports = {
    type: 'admin',
    routes: [
        {
            method: 'POST',
            path: '/generate',
            handler: 'generator.generate',
            config: {
                policies: ['plugin::ai-generator.is-authorized'],
            },
        },
    ],
};
