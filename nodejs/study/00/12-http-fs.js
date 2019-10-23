var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request',function(req,res){
    var url = req.url;

    if(url=='/'){
        res.end('hello');
    }else if(url=='/index'){
        fs.readFile('./bootstrap/列表项.html',function(err,data){
            if(err){
                res.setHeader('Content-Type','text/plain;charset=utf-8');
                res.end('文件读取失败，请稍后重试！');
            }else{
                res.setHeader('Content-Type','text/html;charset=utf-8');
                res.end(data); 
            }
        })
    }else{
        res.end('hello');
    }
})

server.listen(3000,function(){
    console.log(('Server is running.....'));
})