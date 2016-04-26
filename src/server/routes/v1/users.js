var express = require("express");
var router = express.Router();
var models = require("models");

router.get('/', function (req, res) {
    models.User.findAll()
        .then(function (users) {
            res.setHeader('content-type', 'application/json');
            res.statusCode = 200;
            res.send(users);
        });
});

module.exports = router;