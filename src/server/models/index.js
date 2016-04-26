/**
 * ORM's initialization script
 */

"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var logger = require("lib/logger");
var sequelize = new Sequelize("HostelJ", "root", "", {
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
        ssl: false
    },
    define: {
        timestamp: true
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

/**
 * Object comprising all `models`, associations, connection
 * and `sequelize` module itself
 */
var db = {};

// Read all models from `models` directory and create a local object
fs.readdirSync(__dirname)
    .filter(function (file) {
        return(
            file
            && file.indexOf(".js") !== 0
            && file != "index.js"
        );
    })
    .forEach(function (file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

// Load all `associations`, if any
Object.keys(db)
    .forEach(function (model) {
        if ("associate" in db[model]) {
            db[model].associate(db);
        }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;