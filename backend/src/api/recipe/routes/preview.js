export default {
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
