// @ts-ignore
import pluginPkg from './package.json';
import pluginId from './pluginId.js';
import HomePage from './admin/src/pages/HomePage/index.jsx';
import { FaWandMagicSparkles } from 'react-icons/fa6';

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: FaWandMagicSparkles,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'AI Generator',
      },
      Component: async () => HomePage, // ✅ CRITICAL FIX
      permissions: [],
    });

    app.registerPlugin({
      id: pluginId,
      name: pluginPkg.strapi.name,
    });
  },

  bootstrap(app) {},

  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(
            `./admin/src/translations/${locale}.json`
          );
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
