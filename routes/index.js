var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'NewsDog' });
});
router.get('/terms', function(req, res) {
  res.render('terms');
});
router.get('/app', function(req, res) {
  res.render('app');
});
router.get('/privacy', function(req, res) {
  res.render('privacy');
});

module.exports = router;
