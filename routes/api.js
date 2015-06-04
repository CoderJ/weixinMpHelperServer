var express = require('express');
var router = express.Router();
var data = require('../data/data');
var http = require('http');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/list/', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(data);
});

router.get('/money/', function(req, res) {
    res.set('Content-Type', 'application/json');
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

router.get('/income/', function(req, res) {
    res.set('Content-Type', 'application/json');
    var num = req.query.num || '000729';
    var url = '/jxjj/qxcp/jzcxjsp.jsp?code='+num;


    var options = {
        hostname: 'www.ccbfund.cn',
        port: 80,
        path: url,
        method: 'GET'
    };

    var req = http.request(options, function (rs) {
        rs.setEncoding('utf8');
        rs.on('data', function (chunk) {
            var $ = cheerio.load(chunk);
            $("table tr").each(function(){
                var data = {};
                var td = $(this).find("td");
                if(td.length<1){
                    return ;
                }else{
                    var data = {
                        date : td[0].children[0].data.replace(/-/g,'/'),
                        price : parseFloat(td[1].children[0].data)
                    };
                }
            });
            res.send(200);
        });
    });

    req.on('error', function (e) {
        res.send('problem with request: ' + e.message);
    });

    req.end();
});

module.exports = router;
