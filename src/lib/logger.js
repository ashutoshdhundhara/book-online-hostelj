var path = require("path");
var bunyan = require("bunyan");
var prettystream = require("bunyan-prettystream");

var prettyStdout = new prettystream();
prettyStdout.pipe(process.stdout);

var logger = bunyan.createLogger({
  name: 'book-online-hostelj',
  stream: prettyStdout
});

module.exports = logger;