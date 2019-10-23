// 0.安装
// npm install express --save

// 1.引包
var express = require('express');

// 2.创建你的服务器程序
//      相当于 http.createServer
var app = express();

// 公开指定目录
// 只要这样做，就可以直接通过  /public/xx 的方式访问 public 目录中的所有资源了
app.use('/public/',express.static('./public/'));

//当服务器收到 get 请求 / 的时候，执行回调处理函数
app.get('/',function(req,res){
    // 在 Express 中可以直接通过 req.query 来获取查询字符串参数
    // console.log(req.query);
    res.end('hello express');
})

//当服务器收到 post 请求 /aaa 的时候，执行回调处理函数
app.post('/aaa',function(req,res){
    // 在 Express 中可以直接通过 req.query 来获取查询字符串参数
    // console.log(req.query);
    res.end('hello express post');
})

//当服务器收到 get 请求 /nihao 的时候，执行回调处理函数
app.get('/nihao',function(req,res){
    res.end('你好,Express');
})

app.listen(3000,function(){
    console.log('app is running at port 3000.');
})