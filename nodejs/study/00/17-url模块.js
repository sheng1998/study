var url = require('url');

var obj = url.parse('/comment?name=大幅度很过分&message=eat分为二个特如何',true);

console.log(obj);
console.log(obj.pathname);