var http = require("http");

var server = http.createServer();

server.on('request',function(req,res){
    console.log("你的请求路径为：" + req.url);
    // res.write("124");
    // res.end("111111");
    var url = req.url;
    
    if (url==='/') {
        res.end('index page');
    }else if(url==='/login'||url==='/login/'){
        res.end('login page');
    }else{
        res.end('404 Not Found.');//只能是二进制数据或者字符串
    }
});

server.listen(3000,function(){
    console.log("服务器启动成功，可以访问了。。。。。。。。。。。");
})