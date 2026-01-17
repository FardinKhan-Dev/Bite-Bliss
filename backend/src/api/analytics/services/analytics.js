module.exports = ({ strapi }) => ({
    /**
     * Get revenue metrics
     */
    async getRevenueMetrics() {
        try {
            const subscriptions = await strapi.db.query('api::user-subscription.user-subscription').findMany({
                where: { status: 'active' },
                populate: { plan: true },
            });

            // Calculate MRR (Monthly Recurring Revenue)
            let mrr = 0;
            let premiumRevenue = 0;
            let vipRevenue = 0;

            subscriptions.forEach(sub => {
                const monthlyPrice = sub.plan?.price || 0;
                mrr += monthlyPrice;

                if (sub.plan?.tier === 1) premiumRevenue += monthlyPrice;
                if (sub.plan?.tier === 2) vipRevenue += monthlyPrice;
            });

            // Get this month's revenue (you'd track actual payments from Stripe)
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return {
                mrr: mrr.toFixed(2),
                arr: (mrr * 12).toFixed(2), // Annual Recurring Revenue
                thisMonthRevenue: mrr.toFixed(2), // Simplified for now
                premiumRevenue: premiumRevenue.toFixed(2),
                vipRevenue: vipRevenue.toFixed(2),
                totalActiveSubscriptions: subscriptions.length,
            };
        } catch (error) {
            console.error('Revenue metrics error:', error);
            throw error;
        }
    },

    /**
     * Get subscriber metrics
     */
    async getSubscriberMetrics() {
        try {
            // Get all subscriptions
            const allSubscriptions = await strapi.db.query('api::user-subscription.user-subscription').findMany({
                populate: { plan: true },
            });

            // Get active subscriptions
            const activeSubscriptions = allSubscriptions.filter(s => s.status === 'active');

            // Count by tier
            const freeUsers = await strapi.db.query('plugin::users-permissions.user').count() - activeSubscriptions.length;
            const premiumUsers = activeSubscriptions.filter(s => s.plan?.tier === 1).length;
            const vipUsers = activeSubscriptions.filter(s => s.plan?.tier === 2).length;

            // Get new signups this week
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const newSignupsThisWeek = await strapi.db.query('plugin::users-permissions.user').count({
                where: {
                    createdAt: { $gte: oneWeekAgo },
                },
            });

            // Get new subscriptions this month
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

            const newSubscriptionsThisMonth = allSubscriptions.filter(s => {
                return new Date(s.createdAt) >= oneMonthAgo;
            }).length;

            // Calculate churn rate (canceled this month / total subscribers)
            const canceledThisMonth = allSubscriptions.filter(s => {
                return s.status === 'canceled' && new Date(s.canceledAt) >= oneMonthAgo;
            }).length;

            const churnRate = activeSubscriptions.length > 0
                ? ((canceledThisMonth / activeSubscriptions.length) * 100).toFixed(1)
                : 0;

            return {
                totalUsers: await strapi.db.query('plugin::users-permissions.user').count(),
                freeUsers,
                premiumUsers,
                vipUsers,
                activeSubscriptions: activeSubscriptions.length,
                newSignupsThisWeek,
                newSubscriptionsThisMonth,
                churnRate: `${churnRate}%`,
                canceledThisMonth,
            };
        } catch (error) {
            console.error('Subscriber metrics error:', error);
            throw error;
        }
    },

    /**
     * Get content metrics
     */
    async getContentMetrics() {
        try {
            const totalRecipes = await strapi.db.query('api::recipe.recipe').count();
            const premiumRecipes = await strapi.db.query('api::recipe.recipe').count({
                where: { isPremium: true },
            });
            const freeRecipes = totalRecipes - premiumRecipes;

            // Get recipes by category
            const categories = await strapi.db.query('api::category.category').findMany({
                populate: { recipes: true },
            });

            const recipesByCategory = categories.map(cat => ({
                name: cat.name,
                count: cat.recipes?.length || 0,
            }));

            // Get top 10 most viewed recipes
            const topRecipes = await strapi.db.query('api::recipe.recipe').findMany({
                limit: 10,
                orderBy: { viewCount: 'desc' },
                select: ['title', 'viewCount', 'slug'],
            });

            return {
                totalRecipes,
                freeRecipes,
                premiumRecipes,
                recipesByCategory,
                topRecipes: topRecipes.map(r => ({
                    title: r.title,
                    views: r.viewCount || 0,
                    slug: r.slug,
                })),
            };
        } catch (error) {
            console.error('Content metrics error:', error);
            throw error;
        }
    },

    /**
     * Get dashboard overview (all metrics)
     */
    async getDashboardOverview() {
        try {
            const [revenue, subscribers, content] = await Promise.all([
                this.getRevenueMetrics(),
                this.getSubscriberMetrics(),
                this.getContentMetrics(),
            ]);

            return {
                revenue,
                subscribers,
                content,
                generatedAt: new Date(),
            };
        } catch (error) {
            console.error('Dashboard overview error:', error);
            throw error;
        }
    },
});
