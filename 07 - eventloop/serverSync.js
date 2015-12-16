const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  var info;
  if(req.url == '/') {
    try {
      info = fs.readFileSync('index.html');
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.end('На сервере произошла ошибка!');
      return;
    }
    res.end(info);
  } else {
    res.statusCode = 404;
    res.end('Страница не найдена');
  }
}).listen(3000);