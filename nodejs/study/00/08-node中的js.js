//用来获取机器信息的
var os = require('os');

//用来操作路径的
var path = require('path');

//获取当前机器的CPU 信息
console.log(os.cpus());

// memory 内存
console.log(os.totalmem());

//获取一个路径中的扩展名部分
// extnase extension name
console.log(path.extname('hello.txt'));