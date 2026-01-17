module.exports = async (policyContext, config, { strapi }) => {
    const { userAbility } = policyContext.state;

    // Check if user is authenticated
    if (!policyContext.state.user) {
        return false;
    }

    const user = policyContext.state.user;

    // Get user roles
    const roles = user.roles || [];
    const roleNames = roles.map(role => role.name.toLowerCase());

    // Allow these roles: Author, Editor, Admin, Super Admin
    const allowedRoles = ['author', 'editor', 'admin', 'super admin', 'strapi-super-admin'];

    // Check if user has at least one allowed role
    const hasAccess = roleNames.some(roleName =>
        allowedRoles.includes(roleName)
    );

    if (!hasAccess) {
        strapi.log.warn(`User ${user.email} attempted to access AI generator without proper role`);
    }

    return hasAccess;
};
