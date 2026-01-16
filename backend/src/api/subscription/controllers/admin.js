export default {
    /**
     * Get all subscribers with search and filters
     */
    async getAll(ctx) {
        try {
            const { search, tier, status, page = 1, pageSize = 25 } = ctx.query;

            // Build query
            const where = {};

            if (tier !== undefined) {
                where['plan.tier'] = tier;
            }

            if (status) {
                where.status = status;
            }

            // Get subscriptions with user data
            const subscriptions = await strapi.db.query('api::user-subscription.user-subscription').findMany({
                where: status ? { status } : {},
                populate: {
                    plan: true,
                    user: {
                        select: ['id', 'username', 'email', 'createdAt'],
                    },
                },
                orderBy: { createdAt: 'desc' },
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });

            // Filter by search if provided
            let results = subscriptions;
            if (search) {
                results = subscriptions.filter(sub =>
                    sub.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
                    sub.user?.username?.toLowerCase().includes(search.toLowerCase())
                );
            }

            // Get total count
            const total = await strapi.db.query('api::user-subscription.user-subscription').count({
                where: status ? { status } : {},
            });

            return {
                data: results,
                pagination: {
                    page: parseInt(page),
                    pageSize: parseInt(pageSize),
                    total,
                    pageCount: Math.ceil(total / pageSize),
                },
            };
        } catch (error) {
            console.error('Get subscribers error:', error);
            return ctx.internalServerError('Failed to fetch subscribers');
        }
    },

    /**
     * Get single subscriber details
     */
    async getOne(ctx) {
        try {
            const { id } = ctx.params;

            const subscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
                where: { id },
                populate: {
                    plan: true,
                    user: true,
                },
            });

            if (!subscription) {
                return ctx.notFound('Subscriber not found');
            }

            return subscription;
        } catch (error) {
            console.error('Get subscriber error:', error);
            return ctx.internalServerError('Failed to fetch subscriber');
        }
    },

    /**
     * Manually grant access to a user
     */
    async grantAccess(ctx) {
        try {
            const { userId, planId } = ctx.request.body;

            if (!userId || !planId) {
                return ctx.badRequest('userId and planId are required');
            }

            // Check if subscription already exists
            const existing = await strapi.db.query('api::user-subscription.user-subscription').findOne({
                where: { user: userId },
            });

            const plan = await strapi.db.query('api::subscription-plan.subscription-plan').findOne({
                where: { id: planId },
            });

            if (!plan) {
                return ctx.notFound('Plan not found');
            }

            if (existing) {
                // Update existing subscription
                await strapi.documents('api::user-subscription.user-subscription').update({
                    documentId: existing.documentId,
                    data: {
                        plan: plan.documentId,
                        status: 'active',
                    },
                });
            } else {
                // Create new subscription
                await strapi.documents('api::user-subscription.user-subscription').create({
                    data: {
                        user: userId,
                        plan: plan.documentId,
                        status: 'active',
                        publishedAt: new Date(),
                    },
                });
            }

            return { message: 'Access granted successfully' };
        } catch (error) {
            console.error('Grant access error:', error);
            return ctx.internalServerError('Failed to grant access');
        }
    },

    /**
     * Revoke access from a user
     */
    async revokeAccess(ctx) {
        try {
            const { id } = ctx.params;

            const subscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
                where: { id },
            });

            if (!subscription) {
                return ctx.notFound('Subscription not found');
            }

            await strapi.documents('api::user-subscription.user-subscription').update({
                documentId: subscription.documentId,
                data: {
                    status: 'canceled',
                    canceledAt: new Date(),
                },
            });

            return { message: 'Access revoked successfully' };
        } catch (error) {
            console.error('Revoke access error:', error);
            return ctx.internalServerError('Failed to revoke access');
        }
    },

    /**
     * Send email to specific subscriber
     */
    async sendEmail(ctx) {
        try {
            const { id } = ctx.params;
            const { subject, message } = ctx.request.body;

            if (!subject || !message) {
                return ctx.badRequest('Subject and message are required');
            }

            const subscription = await strapi.db.query('api::user-subscription.user-subscription').findOne({
                where: { id },
                populate: { user: true },
            });

            if (!subscription?.user) {
                return ctx.notFound('Subscriber not found');
            }

            // Send email using email service
            await strapi.plugins['email'].services.email.send({
                to: subscription.user.email,
                from: process.env.EMAIL_ADDRESS_FROM,
                subject,
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="content">
                  ${message}
                </div>
              </div>
            </body>
          </html>
        `,
            });

            return { message: 'Email sent successfully' };
        } catch (error) {
            console.error('Send email error:', error);
            return ctx.internalServerError('Failed to send email');
        }
    },
};
