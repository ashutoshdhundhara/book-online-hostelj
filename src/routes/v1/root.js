var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
  res.send('<h1>Index route</h1>');
});

module.exports = router;