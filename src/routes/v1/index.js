"use strict";

var fs = require("fs");
var path = require("path");

/**
 * Object comprising of all the route handlers inside the directory
 */
var routes = {};

// Read all routes from directory and create local object
fs.readdirSync(__dirname)
    .filter(function (file) {
        return(
            file
            && file.indexOf(".js") !== 0
            && file != "index.js"
        );
    })
    .forEach(function (file) {
        var route = path.basename(file, ".js");
        routes[route] = require("routes/v1/" + route);
    });

module.exports = routes;