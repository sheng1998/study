var fs = require('fs');
var http = require('http');
var url = require('url');
var template = require('art-template');

var comments = [
    {
        name: '张三',
        message: '今天天气很好哦',
        dateTime: '2019-10-01'
    },
    {
        name: '李四',
        message: '今天天气很好哦',
        dateTime: '2019-10-01'
    },
    {
        name: '旺旺',
        message: '今天天气很好哦',
        dateTime: '2019-10-01'
    },
    {
        name: '六',
        message: '今天天气很好哦',
        dateTime: '2019-10-01'
    },
    {
        name: '哈哈哈',
        message: '今天天气很好哦',
        dateTime: '2019-10-01'
    },
]

var server = http.createServer();

server.on('request',function(req,res){
    var pathObj = url.parse(req.url,true);

    var pathName = pathObj.pathname;

    if((pathName==='/index.html')||(pathName==='/')){
        fs.readFile('./views/nav.html',function(err,data){
            if(err){
                return console.log('404 Not Found.');
            }
            var htmlStr = template.render(data.toString(),{
                comments: comments,
            })
            res.end(htmlStr);
        })
    }else if(pathName === '/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err){
                return console.log('404 Not Found.');
            }
            res.end(data);
        })
    }else if(pathName === '/comment'){
        // res.end(JSON.stringify(pathObj.query));//格式化
        var comment = pathObj.query;
        comment.dateTime = '2019-01-01';
        comments.unshift(comment);

        /*
            301 与 302 的区别
                301 永久重定向，浏览器会记住
                302 临时重定向，每次加载都要向客户端发送请求
        */
        res.statusCode = 302;//临时重定向
        res.setHeader('Location','/');
        res.end();
    }else if((pathName.indexOf('/public/')!=-1)){
        fs.readFile('.' + pathName,function(err,data){
            if(err){
                return console.log('404 Not Found.');
            }
            res.end(data);
        })
    }else{
        fs.readFile('./views/404.html',function(err,data){
            if(err){
                return console.log('404 Not Found.');
            }
            res.end(data);
        })
    }
})

server.listen(3000,function(){
    console.log('Running.....');
})