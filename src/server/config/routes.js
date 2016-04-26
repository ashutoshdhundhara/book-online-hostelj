var v1 = require("routes/v1");

module.exports = function (app) {
    // `v1` routes
    app.use('/v1/', v1.root);
    app.use('/v1/users', v1.users);
}