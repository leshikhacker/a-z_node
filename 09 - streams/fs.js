var fs = require('fs');

var stream = new fs.ReadStream('big1.html');

stream.on('readable', function() {
  var data = stream.read();
  if(data != null)
    console.log(data.length);
});

stream.on('end', function() {
  console.log('end');
});

stream.on('error', function(err) {
  if(err.code == 'ENOENT') {
    console.log('File is not found!');
  } else {
    console.err(err);
  }
});