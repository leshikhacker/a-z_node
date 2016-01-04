const http = require('http');
var argv = require('optimist').argv;

http.createServer(function(req, res) {
  res.end('The server is running!');
}).listen(argv.port);