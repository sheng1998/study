var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/zzs', {useNewUrlParser: true});

var userSchema = new Schema({
    email:{
        type:String,    //数据类型
        required:true   //表示必须项(默认为 false)，相当于 not null
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdTime:{
        type:Date,
        default:Date.now    //注意这里不要加括号
    },
    lastModifiedTime:{
        type:Date,
        default:Date.now
    },avatar:{
        type:String,
        default:'/public/img/avatar-default.png'
    },
    bio:{
        type:String,
        default:""
    },
    gender:{
        type:Number,
        enum:[-1,0,1],  //-1：保密，0：男，1：女
        default:-1
    },
    birthday:{
        type:Date
    },
    status:{
        type:Number,
        enum:[0,1,2],   //0:没有权限限制，1：禁止评论，2：禁止登陆
        default:0
    }
})

module.exports = mongoose.model('User', userSchema);