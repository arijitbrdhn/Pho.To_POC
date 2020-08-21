// V1 routes --->
const publicRouter = require('./api/controllers/routes');

/**
 *
 *
 * @export
 * @param {any} app
 */
module.exports = function routes(app) {
    // Common routes
    app.use('/public', publicRouter);
    return app;
}
