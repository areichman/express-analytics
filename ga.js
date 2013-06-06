// Google Analytics
// based on https://github.com/Skookum/nodealytics

var ACCOUNT_ID = 'UA-XXXXX-X';

var request = require('request').defaults({jar: false}),
    qs      = require('querystring');

var randomId = function() {
  return Math.floor(Math.random() * 8999999999 + 1000000000);
};

var cookieParams = function() {
  var today = Date.now(), str1 = '1.' + randomId() + '00145214523.' + randomId() + '.' + today + '.' + today + '.15';
  return '__utma=' + str1 + ';+__utmz=1.' + today + '.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none);';
};

exports.trackPageview = function(req) {
  // don't track requests from the ui or the favicon.ico urls from express
  if (req.headers.referer || req.url === '/favicon.ico') return;
  
  var params = {  // seems to be sensitive to the order they are listed
    utmcs:  'UTF-8',
    utmul:  'en-us',
    utmhn:  req.host,
    utmp:   req.url,
    utmac:  ACCOUNT_ID,
    utmcc:  cookieParams()
  };
  
  request.get('http://www.google-analytics.com/__utm.gif?' + qs.stringify(params));
};
