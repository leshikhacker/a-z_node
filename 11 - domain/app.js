const domain = require('domain');
var serverDomain = domain.create();

var server;

serverDomain.on('error', function(err) {
  console.log('Server error', err);

  if(server) server.close();

  setTimeout(function() {
    process.exit(1);
  }, 1000).unref();
});

serverDomain.run(function() {
  const http = require('http');
  const handler = require('./handler');

  server = http.createServer(function(req, res) {
    var reqDomain = domain.create();
    reqDomain.add(req);
    reqDomain.add(res);

    reqDomain.on('error', function(err) {
      res.statusCode = 500;
      res.end('Sorry, ' + err);
      console.error('Error for req = ', err);

      serverDomain.emit('error', err);
    });

    reqDomain.run(function() {
      handler(req, res);
    });
  });

  server.listen(3000);
});
