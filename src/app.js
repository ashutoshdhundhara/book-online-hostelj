var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var routes = require('config/routes');
import authentication from 'security/authentication'
import authorization from 'security/authorization'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Authentication and Authorization (order matters).
app.use(authentication)
app.use(authorization)

// Initialize routes.
routes(app);

module.exports = app;