var foo = "bbbb";
console.log("b.js 被执行了");

require('./c.js');//可以省略后缀，默认为.js

console.log("b.js 执行结束");