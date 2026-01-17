module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: 'http://localhost:3000',
      async handler(uid, { documentId, locale, status }) {
        // Only handle recipe content type
        if (uid !== 'api::recipe.recipe') {
          return null;
        }

        // Fetch the document to get the slug
        const document = await strapi.documents(uid).findOne({
          documentId
        });

        if (!document || !document.slug) {
          return null;
        }

        // Generate preview URL with query parameters
        const clientUrl = 'http://localhost:3000';
        const urlSearchParams = new URLSearchParams({
          slug: document.slug,
          documentId,
          status,
        });

        return `${clientUrl}/api/preview?${urlSearchParams}`;
      },
    },
  },
});
