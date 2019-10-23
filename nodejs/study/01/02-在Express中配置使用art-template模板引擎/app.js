var express = require('express');
// var bodyParser = require('body-parser');//[需要安装 body-parser 包]

var app = express();

app.use('/public/',express.static('./public'));

// 在 Express 中配置使用 art-template 模板引擎
// app.engine('art',require('express-art-template'));
app.engine('html',require('express-art-template'));//我要渲染的是html 文件，所以将 art 改为 html

// 第一个参数 art 表示，当渲染以 .art 为后缀的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中的
// 虽然这里不需要加载 art-template ,但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template

//如果想要修改默认的 views 目录，则可以执行下面代码
//app.set('views',render 函数的默认路径);

//配置 body-parser 中间件(插件，专门用来解析表单post请求体)[需要安装 body-parser 包]
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

app.get('/index.html',function(req,res){
    res.render('index.html',{
        title:'在 Express 中配置使用 art-template 模板引擎'
    })
})
// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引掌就可以使用了
// res.render('html模板名’，{模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说Express有一个约定：开发人员把所有的视图文件都放到 views 目录中

app.post('/index.html',function(req,res){
    res.render('index.html',{
        title:'在 Express 中配置使用 art-template 模板引擎'
    })
})

app.listen(3000,function(){
    console.log('app is running at port 3000.');
})