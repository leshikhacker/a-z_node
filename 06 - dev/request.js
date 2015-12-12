var url = require('url');
var log = require('./log')(module);

module.exports = function(req, res){
  var urlParsed = url.parse(req.url, true);

  log.info('Got request:', req.method, req.url);

  if(urlParsed.pathname == '/echo' && urlParsed.query.message) {
    var message = urlParsed.query.message;
    log.debug('Echo: ' + message);

    res.writeHead(200, 'OK', {'Cache-control': 'no-cache'});
    res.end(message);

    return;
  }
  log.error('Unknown url');

  res.statusCode = 404;
  res.end('Page not found');
};
