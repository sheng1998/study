var http = require('http');

var server = http.createServer();

server.on("request",function(req,res){

    // res.setHeader('Content-Type','text/plain;charset=utf-8');//设定发送的数据类型为： utf-8
    // res.end('hello 学习');

    if(req.url==='/plain'){
        //text/plain 就是普通文本
        res.setHeader('Content-Type','text/plain;charset=utf-8');//设定发送的数据类型为： utf-8
        res.end('hello 学习');
    }else if(req.url==='/html'){
        //text/html HTML格式的字符串，会被解析为 html 文本
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.end('<p>hello html <h2>你好<a href="http://www.baidu.com">百度</a></h2></p>');
    }else{
        res.end('hello');
    }
})

server.listen(3000,function(){
    console.log(('Server is running.....'));
})