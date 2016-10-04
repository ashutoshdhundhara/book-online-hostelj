var express = require("express");
var router = express.Router();

import UserService from 'services/user'

var userService = new UserService()

router.get('/', function (req, res) {
  userService.getAll(req, res)
});

router.post('/', function (req, res) {
  userService.save(req, res)
});

module.exports = router;