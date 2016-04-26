var config = {};

config.env = process.env.NODE_ENV || "development";
config.PORT = 8080;
config.logsPath = '/tmp/';

module.exports = config;