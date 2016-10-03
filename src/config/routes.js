import logger from 'lib/logger'
var v1 = require("routes/v1");

module.exports = function (app) {
    // `v1` routes
    app.use('/api/v1/', v1.root);
    app.use('/api/v1/users', v1.users);
    app.use('/api/v1/login', v1.login);

    // Fallback route.
    app.use((req, res) => {
        res.status(404)
            .send({ success: false, error: { code: "RESOURCE_NOT_FOUND" }})
    })

    // Global error handler.
    app.use((err, req, res, next) => {
        logger.error("Error captured at global error handler.", err)
        res.status(500)
            .send({ success: false, error: { code: "SERVER_ERROR" }})
    })
}