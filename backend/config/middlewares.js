export default [
  'strapi::logger',
  'strapi::errors',
  'global::upload-error-handler',

  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // Connections (API, uploads, editor)
          'connect-src': [
            "'self'",
            'https:',
            'blob:',
            '*.strapi.io',
          ],

          // Images
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://market-assets.strapi.io',
            'https://res.cloudinary.com',
            'dl.airtable.com',
            'strapi.io',
            's3.amazonaws.com',
            'cdn.jsdelivr.net',
          ],

          // Media (video/audio)
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://res.cloudinary.com',
          ],

          // Styles
          'style-src': [
            "'self'",
            "'unsafe-inline'",
          ],

          // Fonts
          'font-src': [
            "'self'",
          ],

          upgradeInsecureRequests: null,
        },
      },
    },
  },

  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
