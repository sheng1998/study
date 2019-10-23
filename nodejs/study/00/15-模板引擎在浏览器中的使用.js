/*
    服务端渲染和客户端渲染的区别
        客户端渲染不利于 SEO 搜索引擎优化(可以在搜索引擎搜索得到)
        服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
        所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
        而是两者结合来做的

        例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
        而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染
*/

var fs = require('fs');
var http = require('http');
var template = require('art-template');

var server = http.createServer();

server.on('request',function(req,res){
    var url = req.url;

    if(url==='/'){
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end("欢迎访问。");
    }else if(url==='/index.html'){
        fs.readFile('./art-template.html',function(err,data){
            if(err){
                res.setHeader('Content-Type','text/plain;charset=utf-8');
                return res.end("找不到文件！");
            }
            var htmlStr = template.render(data.toString(),{
                title:'art-template演示',
                name:'庄值升',
                age:'20',
                province:'广东阳江',
                hobbies:[
                    '唱',
                    '跳',
                    'rap',
                    '篮球'
                ]
            });//template 只认识{{}}，它会将 data.toString() 中有{{}}
            res.setHeader('Content-Type','text/html;charset=utf-8');
            res.end(htmlStr);
        })
    }
})

server.listen(3000,function(){
    console.log('Server is running......');
})
