var path = require('path');
var express = require('express');
var routes = require('config/routes');
var logger = require("lib/logger");

var app = express();

// Initialize routes
routes(app);

module.exports = app;