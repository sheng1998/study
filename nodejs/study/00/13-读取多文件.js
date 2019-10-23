var http = require('http');
var fs = require('fs');

var Dir = 'G:/node/www';

var server = http.createServer();

server.on('request',function(req,res){
    var url = req.url;

    var filePath = '/index.html';
    if(url!='/'){
        filePath = url;
    }

    fs.readFile(Dir + filePath,function(err,data){
        if(err){
            return res.end('404 Not Found.');
        }
        // res.setHeader('Content-Type','text/html;charset=utf-8');
        res.end(data);
    })
})

server.listen(3000,function(){
    console.log('Running.....');
})