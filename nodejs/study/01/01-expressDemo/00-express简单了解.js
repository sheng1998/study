// 0.安装
// npm install express --save

// 1.引包
var express = require('express');

// 2.创建你的服务器程序
//      相当于 http.createServer
var app = express();

//当服务器收到 get 请求 / 的时候，执行回调处理函数
app.get('/',function(req,res){
    res.end('hello,Express');
})

app.listen(3000,function(){
    console.log('app is running at port 3000.');
})