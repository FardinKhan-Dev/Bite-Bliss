module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/subscription/admin/subscribers',
            handler: 'admin.getAll',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
        {
            method: 'GET',
            path: '/subscription/admin/subscribers/:id',
            handler: 'admin.getOne',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
        {
            method: 'POST',
            path: '/subscription/admin/grant-access',
            handler: 'admin.grantAccess',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
        {
            method: 'POST',
            path: '/subscription/admin/subscribers/:id/revoke',
            handler: 'admin.revokeAccess',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
        {
            method: 'POST',
            path: '/subscription/admin/subscribers/:id/send-email',
            handler: 'admin.sendEmail',
            config: {
                policies: ['admin::isAuthenticatedAdmin'],
            },
        },
    ],
};
