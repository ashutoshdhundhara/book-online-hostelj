var config = {};

config.env = process.env.NODE_ENV || "dev";
config.PORT = 8080;
config.logsPath = '/tmp/';

// DB settings
config.DB_HOST      = process.env.DB_HOST || "localhost";
config.DB_USER      = process.env.DB_USER || "root";
config.DB_PASSWORD  = process.env.DB_PASSWORD || "";
config.DB_NAME      = process.env.DB_NAME || "HostelJ";

config.jwtSecret    = process.env.JWT_SECRET || "veryH@rd$ecretT0Gue$$"
config.jwtAlgo      = 'HS256'
config.jwtTTL       = 6048000

module.exports = config;