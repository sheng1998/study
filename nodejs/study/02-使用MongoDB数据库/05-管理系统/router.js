/*
    router.js 路由模块
*/
var fs = require('fs');
var Student = require('./student.js');

//专门用来包装路由的
var express = require('express');

// 1.创建一个路由容器
var router = express.Router();


// 2.把路由挂载到 router 卤藕容器中
router.get('/',function(req,res){
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Sever error.');
        }
        res.render('index.html',{
            fruits:[
                '苹果',
                '香蕉',
                '梨子',
                '橘子'
            ],
            students: students
        });
    })
})

router.get('/student',function(req,res){
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Sever error.');
        }
        res.render('index.html',{
            fruits:[
                '苹果',
                '香蕉',
                '梨子',
                '橘子'
            ],
            students: students
        });
    })
})

router.get('/student/new',function(req,res){
    res.render('new.html');
})

router.post('/student/new',function(req,res){
    new Student(req.body).save(function(err){
        if(err){
            return res.status(500).send('Sever error.');
        }
        res.redirect('/student');
    })
})

router.get('/student/edit',function(req,res){
    Student.findById(req.query.id.replace(/"/g,''),function(err,student){
        if(err){
            return res.status(500).send('Sever error.');
        }
        res.render('edit.html',{
            student:student
        })
    })
})

router.post('/student/edit',function(req,res){
    Student.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body,function(err){
        if(err){
            return res.status(500).send('Sever error.');
        }
        res.redirect('/student');
    })
})

router.get('/student/delete',function(req,res){
    Student.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
        if(err){
            return res.status(500).send('Sever error.');
        }
        res.redirect('/student');
    })
})

// 3.把router 导出
module.exports = router;
