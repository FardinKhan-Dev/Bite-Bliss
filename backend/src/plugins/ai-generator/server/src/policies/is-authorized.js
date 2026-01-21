module.exports = async (policyContext, config, { strapi }) => {
    // Check if user is authenticated in admin panel
    if (!policyContext.state.user) {
        strapi.log.warn('AI Generator: Unauthenticated access attempt');
        return false;
    }

    // Allow any authenticated admin user
    return true;
};
