var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// 1.连接MongoDB 数据库(如果数据库 test 不存在，在实例化的时候会自动创建)
mongoose.connect('mongodb://localhost/student', {useNewUrlParser: true});

// 2.设置文档结构(表结构)
    //字段名称就是表结构的属性名称
    //约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username:{
        type:String,    //数据类型
        required:true   //表示必须项(默认为 false)，相当于 not null
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    }
})

// 3.将文档结构发布为模型
//  第一个参数：传入一个大写名词单数字符串用来表示你的数据库名词
//       mongoose 自动将大写名词的字符串生成小写复数的集合名称
//      第一个参数中的 User 会变成 users 集合名称
var User = mongoose.model('User', userSchema);

// 4.这一步可以执行增删改查了

/* 删 */
//根据条件删除所有数据
// User.remove({
//     username:'小庄'
// },function(err,ret){
//     if(err){
//         console.log('删除失败');
//     }else{
//         console.log(ret);
//     }
// })

//根据条件删除一条数据
// User.findOneAndRemove({
//     username:'小庄'
// },function(err,ret){
//     if(err){
//         console.log('删除失败');
//     }else{
//         console.log(ret);
//     }
// })

//根据id删除一条数据
User.findByIdAndRemove('5d847e39b38bd707f4047676',function(err,ret){
    if(err){
        console.log('删除失败');
    }else{
        console.log(ret);
    }
})
