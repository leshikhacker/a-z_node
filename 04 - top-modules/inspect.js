var util = require('util');

var obj = {
  a: 5,
  b: 6,
  inspect: function() {
    return 'a: ' + this.a + '; b: ' + this.b + '; this: ' + this;
  }
};
obj.self = obj;

console.log(util.inspect(obj));