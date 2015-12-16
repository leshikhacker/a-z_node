const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// prevent windows pain scenario - it works good without normalize on unix
var ROOT = path.normalize(__dirname + '/public');

http.createServer(function(req, res){
  if(!checkAccess(req)) {
    res.statusCode = 403;
    res.end('Tell me the secret to access!');
    return;
  }

  sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function checkAccess(req) {
  return url.parse(req.url, true).query.secret == 'o_O';
}

function sendFileSafe(filePath, res) {
  try {
    filePath = decodeURIComponent(filePath);
  } catch(e) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  if(~filePath.indexOf('\0')) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  filePath = path.normalize(path.join(ROOT, filePath));

  if(filePath.indexOf(ROOT) != 0) {
    res.statusCode = 404;
    res.end('File not found');
    return;
  }

  fs.stat(filePath, function(err, stats) {
    if(err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }

    sendFile(filePath, res);
  });

}

function sendFile(filePath, res) {
  fs.readFile(filePath, function(err, data) {
    if(err) throw err;

    var mime = require('mime').lookup(filePath);
    res.setHeader('Content-Type', mime + "; charset=utf-8");
    res.end(data);
  });
}