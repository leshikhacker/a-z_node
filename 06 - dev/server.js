var http = require('http');
var log = require('winston');


var server = new http.Server();

server.on('request', require('./request'));

server.listen(1337);

log.info('Server is running');