var express = require('express');

var app = express();

// 公开指定目录方式一
// 只要这样做，就可以直接通过  /public/xx 的方式访问 public 目录中的所有资源了
app.use('/public/',express.static('./public/'));//放到 public 目录下的所有文件将被公开
/* 例如：可以通过访问 http://127.0.0.1:3000/public/js/main.js 从而访问到 public/js 目录下的 main.js 文件了 */

// 公开指定目录方式二(改变第一个参数 /public/)
// 这样做，可以直接通过  /aaa/xx 的方式访问 public 目录中的所有资源了
app.use('/aaa/',express.static('./public/'));//放到 public 目录下的所有文件将被公开
/* 例如：可以通过访问 http://127.0.0.1:3000/aaa/js/index.js 从而访问到 public/js 目录下的 index.js 文件了 */

// 公开指定目录方式三(省略第一个参数 /public/)
// 这样做，可以直接通过  /xx 的方式访问 static 目录中的所有资源了
app.use(express.static('./static/'));//放到 static 目录下的所有文件将被公开
/* 例如：可以通过访问 http://127.0.0.1:3000/js/main.js 从而访问到 static/js 目录下的 main.js 文件了 */


app.get('/',function(req,res){
    res.end('hello,Express');
})

app.listen(3000,function(){
    console.log('app is running at port 3000.');
})