var config = {};

config.env = process.env.NODE_ENV || "development";
config.PORT = 3000;
config.logsPath = '/tmp/';

module.exports = config;