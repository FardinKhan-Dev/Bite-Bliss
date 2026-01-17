module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/recipes/preview/:documentId',
            handler: 'preview.preview',
            config: {
                auth: false,
                policies: [],
            },
        },
    ],
};
