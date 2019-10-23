/*
    在Node 中，没有全局作用域，只有模块作用域
        外部访问不到内部变量
        内部也访问不了外部变量
        默认都是封闭的
*/
var foo = "aaaaa";
console.log("a.js 被执行了");

require('./b.js');//相对路径的 ./ 不能省略，可以省略后缀，默认为.js

console.log(foo);
console.log("a.js 执行结束");