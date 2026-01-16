import TinyMCEEditor from './components/TinyMCEEditor.jsx';
import Analytics from './pages/Analytics/index.jsx';

export default {
    config: {
        locales: [],
    },
    bootstrap(app) {
        // Register TinyMCE as a custom field
        app.addFields({
            type: 'tinymce-editor',
            Component: TinyMCEEditor,
        });
    },
    async register(app) {
        // Register Analytics dashboard page
        app.addMenuLink({
            to: '/plugins/analytics',
            icon: () => '📊',
            intlLabel: {
                id: 'analytics.menu',
                defaultMessage: 'Analytics',
            },
            Component: async () => Analytics,
            permissions: [],
        });

        app.registerPlugin({
            id: 'analytics',
            name: 'analytics',
            isReady: true,
        });
    },
};
