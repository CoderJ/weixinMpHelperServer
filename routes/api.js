var express = require('express');
var router = express.Router();
var data = require('../data/data');
/* GET home page. */
router.get('/list/', function(req, res) {
  res.send(data);
});

module.exports = router;
