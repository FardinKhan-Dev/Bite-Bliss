export default {
    async afterCreate(event) {
        const { result } = event;

        // Send welcome email to new user
        try {
            await strapi.service('api::email.email').sendWelcomeEmail(result);
            console.log(`Welcome email triggered for user: ${result.email}`);
        } catch (error) {
            console.error('Failed to send welcome email:', error);
        }
    },
};
