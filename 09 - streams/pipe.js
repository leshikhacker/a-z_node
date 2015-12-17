const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
  if(req.url == '/big.html') {
    var file = new fs.ReadStream('big.html');

    sendFile(file, res);
  }

}).listen(3000);

function sendFile(file, res) {

  file.pipe(res);

  // OR

  /*
  file.on('readable', write);

  function write() {
    var fileContent = file.read(); // считать

    if(fileContent && !res.write(fileContent)) { // отправить
      file.removeListener('readable', write);

      res.once('drain', function() { // подождать
        file.on('readable', write);
        write();
      });
    }
  }

  file.on('end', function() {
    res.end();
  });*/

  file.on('error', function(err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Server error');
  });

  file.on('open', function() {
    console.log('open');
  }).on('close', function() {
    console.log('close');
  });

  res.on('close', function() {
    file.destroy();
  });
}