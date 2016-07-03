/**
 * ORM's initialization script
 */

"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var logger = require("lib/logger");
var config = require("config/config");

try {
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
        },
        logging: config.env === 'development' ? sequelizeLogger : false
    });
} catch (ex) {
    logger.fatal(ex, "Connection to MySQL failed.");
    process.exit(1);
}

/**
 * Looger for sequelize
 *
 * @param string Message
 * @return void
 */
function sequelizeLogger(ex) {
    logger.info("Inside Sequelize:", ex);
}

/**
 * Object comprising all `models`, associations, connection
 * and `sequelize` module itself
 */
var db = {};

// Read all models from `models` directory and create a local object
try {
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
} catch (ex) {
    logger.fatal(ex, "Model initialization failed.");
    process.exit(1);
}

// Load all `associations`, if any
try {
    Object.keys(db)
        .forEach(function (model) {
            if ("associate" in db[model]) {
                db[model].associate(db);
            }
        });
} catch (ex) {
    logger.fatal(ex, "Model associations failed.");
    process.exit(1);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;