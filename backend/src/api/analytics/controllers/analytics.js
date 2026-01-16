export default {
    /**
     * Get all analytics for admin dashboard
     */
    async getDashboard(ctx) {
        try {
            const overview = await strapi.service('api::analytics.analytics').getDashboardOverview();
            return overview;
        } catch (error) {
            console.error('Analytics dashboard error:', error);
            return ctx.internalServerError('Failed to fetch analytics');
        }
    },

    /**
     * Get revenue metrics only
     */
    async getRevenue(ctx) {
        try {
            const revenue = await strapi.service('api::analytics.analytics').getRevenueMetrics();
            return revenue;
        } catch (error) {
            console.error('Revenue metrics error:', error);
            return ctx.internalServerError('Failed to fetch revenue metrics');
        }
    },

    /**
     * Get subscriber metrics only
     */
    async getSubscribers(ctx) {
        try {
            const subscribers = await strapi.service('api::analytics.analytics').getSubscriberMetrics();
            return subscribers;
        } catch (error) {
            console.error('Subscriber metrics error:', error);
            return ctx.internalServerError('Failed to fetch subscriber metrics');
        }
    },

    /**
     * Get content metrics only
     */
    async getContent(ctx) {
        try {
            const content = await strapi.service('api::analytics.analytics').getContentMetrics();
            return content;
        } catch (error) {
            console.error('Content metrics error:', error);
            return ctx.internalServerError('Failed to fetch content metrics');
        }
    },
};
