var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('./public'));
// app.use(express.static('./views'));

app.engine('html',require('express-art-template'));

//配置 body-parser 中间件(插件，专门用来解析表单post请求体)[需要安装 body-parser 包]
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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
];

app.get('/',function(req,res){
    res.render('index.html',{
        comments:comments,
    });
})

app.get('/post',function(req,res){
    res.render('post.html');
})

app.post('/post',function(req,res){
    var nd = new Date();
    var yyyy = nd.getFullYear();
    var mm = (nd.getMonth()+1).toString().padStart(2,'0');
    var dd = nd.getDate().toString().padStart(2,'0');

    var comment = req.body;
    comment.dateTime = `${yyyy}-${mm}-${dd}`;
    comments.unshift(comment);
    res.redirect('/');//express 封装的重定向方法
})

app.listen(3000,function(){
    console.log('app is running at port 3000.');
})