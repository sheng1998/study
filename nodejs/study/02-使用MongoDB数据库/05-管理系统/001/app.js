var express = require('express');
var mongoose = require('mongoose');

var app = express();
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/sh', {useNewUrlParser: true});

var studentSchema = new Schema({
    name:{
        type:String,    //数据类型
        required:true   //表示必须项(默认为 false)，相当于 not null
    },
    gender:{
        type:String,
        enum:['男','女'],
        default:'男'
    },
    age:{
        type:Number
    },
    hobbies:{
        type:String
    }
})


app.listen(3000,function(){
    console.log('app is running at port 3000.');
})
