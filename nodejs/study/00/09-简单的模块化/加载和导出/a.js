/*
    require 方法有两个作用
        1.加载文件模块并执行里面的代码
        2.拿到被加载文件模块导出的接口对象

        在每个文件模块中都提供了一个对象：exports
        exports 默认是一个空对象
        你要做的就是要把所有需要被外部访问的成员变量挂载到 exports 上
*/
var bExports = require('./b.js');

console.log(bExports.foo);

console.log(bExports.age);

console.log(bExports.add(3,7));