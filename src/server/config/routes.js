var index = require('../routes');

module.exports = function (app) {
    app.get('/', index);
}