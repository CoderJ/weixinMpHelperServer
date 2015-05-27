var express = require('express');
var router = express.Router();
var data = require('../data/data');
var http = require('http');
var iconv = require('iconv-lite');
/* GET home page. */
router.get('/list/', function(req, res) {
  res.send(data);
});

router.get('/money/', function(req, res) {
    var num = req.query.num || '000729';
    var url = '/js/'+num+'.js?rt='+new Date().getTime();


    var options = {
        hostname: 'fundgz.1234567.com.cn',
        port: 80,
        path: url,
        method: 'GET'
    };

    var req = http.request(options, function (rs) {
        rs.setEncoding('binary');
        rs.on('data', function (chunk) {
            var buf = new Buffer(chunk, 'binary');
            var str = iconv.decode(buf, 'GBK');


            
            s = str.replace(/^jsonpgz\((.*)\)\;/g,'$1');
            res.send(s);
        });
    });

    req.on('error', function (e) {
        res.send('problem with request: ' + e.message);
    });

    req.end();



});

module.exports = router;
