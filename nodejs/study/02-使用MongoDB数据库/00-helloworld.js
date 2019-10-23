// 0.安装包
// npm i -S mongoose

// 1.引包
var mongoose = require('mongoose');

// 2.连接MongoDB 数据库(如果数据库 test 不存在，在实例化的时候会自动创建)
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// 3.将文档结构发布为模型
//       mongoose 自动将大写名词的字符串生成小写复数的集合名称
//      第一个参数中的 Cat 会变成 cats 集合名称
var Cat = mongoose.model('Cat', { name: String });

// 4.实例化一个 Cat
var kitty = new Cat({ name: 'Zildjian' });

// 5.持久化保存 Kitty
kitty.save(function(err,ret){
    if (err) {
        console.log(err);
    }else{
        console.log(ret);
    }
});