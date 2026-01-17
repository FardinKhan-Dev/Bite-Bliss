import controllers from './server/src/controllers/index.js';
import routes from './server/src/routes/index.js';
import policies from './server/src/policies/index.js';

module.exports = () => ({
    controllers,
    routes,
    policies,
});
