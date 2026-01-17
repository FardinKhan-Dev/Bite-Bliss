const controllers = require('./server/src/controllers/index.js');
const routes = require('./server/src/routes/index.js');
const policies = require('./server/src/policies/index.js');

module.exports = () => ({
    controllers,
    routes,
    policies,
});
