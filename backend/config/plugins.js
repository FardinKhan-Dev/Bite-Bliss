export default ({ env }) => ({
    upload: {
        config: {
            provider: 'cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },
    seo: {
        enabled: true,
    },
    documentation: {
        enabled: true,
        config: {
            info: {
                version: '1.0.0',
                title: 'Bite Bliss API',
                description: 'API documentation for Bite Bliss',
            },
        },
    },
});
