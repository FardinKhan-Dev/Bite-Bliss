module.exports = {
    async find(ctx) {
        // Call default find - return all subscription plans
        // @ts-ignore
        const plans = await strapi.documents('api::subscription-plan.subscription-plan').findMany({
            populate: '*',
            sort: { tier: 'asc' },
        });

        // Strapi 5 format
        ctx.body = {
            data: plans || [],
            meta: {
                pagination: {
                    page: 1,
                    pageSize: plans?.length || 0,
                    pageCount: 1,
                    total: plans?.length || 0,
                },
            },
        };
    },

    async findOne(ctx) {
        const { id } = ctx.params;

        // Get single subscription plan
        // @ts-ignore
        const data = await strapi.documents('api::subscription-plan.subscription-plan').findOne({
            documentId: id,
            populate: '*',
        });

        ctx.body = { data };
    },

    async create(ctx) {
        const { data } = ctx.request.body;

        // Create new subscription plan
        // @ts-ignore
        const result = await strapi.documents('api::subscription-plan.subscription-plan').create({
            data,
        });

        ctx.body = { data: result };
    },
};
