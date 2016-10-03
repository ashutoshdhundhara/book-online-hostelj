var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var routes = require('config/routes');
var logger = require("lib/logger");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Initialize routes
routes(app);

module.exports = app;