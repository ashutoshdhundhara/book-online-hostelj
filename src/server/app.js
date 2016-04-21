var path = require('path');
var express = require('express');
var routes = require("./config/routes");

var app = express();

routes(app);

module.exports = app;