/*
    router.js 路由模块
*/

//专门用来包装路由的
var express = require('express');// 加载 express 模块(nodejs框架)
var md5 = require('blueimp-md5');// 加载 blueimp-md5 模块(用于密码加密)
var multer = require("multer");// 加载 multer 模块(文件上传中间件)
var uuid = require('node-uuid');// 加载 node-uuid 模块(生成唯一标识符中间件)
// uuid.v1(); -->基于时间戳生成  （time-based）
// uuid.v4(); -->随机生成  (random)
var User = require('./models/user.js');// 加载用户数据库模块
var Article = require('./models/article.js');// 加载文章数据库模块
var fs = require('fs');

// 1.创建一个路由容器
var router = express.Router();

// 头像默认保存目录
var dir = './public/Avatar/newAvatar';

// 设置文件保存路径以及文件名
var storage = multer.diskStorage({
    // 文件保存路径
    destination: function (req, file, cb) {
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
            cb(null, dir)
        }else{
            cb(null, dir)
        }
    },
    // 文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage: storage
});


// 2.把路由挂载到 router 路由容器中

var Num = 3;// 默认每页显示文档个数
var page = 1;// 默认显示第一页


// 重定向到首页
router.get('/',function(req,res,next){
    res.redirect('/index.html');
})

// 渲染首页
router.get('/index.html',function(req,res,next){
    page = req.query.page;
    if(!page){
        page = 1;
    }
    Article.find()
        .sort({_id:-1})//根据 _id 倒序排序
        .limit(Num)//限制显示文档个数
        .skip(Num*(page-1))//跳过文档个数
        .exec(function(err,articles){
            if(err){
                return next(err);
            }
            res.render('index.html',{
                articles: articles,
                user: req.session.isLogin
            })
        }
    );
})

// 渲染首页
router.post('/index.html',function(req,res,next){
    Article.find(function(err,ret){
        if(err){
            return next(err);
        }
        var Number = Math.ceil(ret.length/Num);//向上取整
        res.status(200).json({
            code:0,
            message:'OK',
            page:page,
            Number:Number
        });
    });
})


// 渲染登录页面
router.get('/login',function(req,res,next){
    res.render('login.html');
})

// 提交登录信息发起 post 请求
router.post('/login',function(req,res,next){
    var body = req.body;

    User.findOne({
        email:body.email,
        password:md5(md5(body.password+'miaoit')+'miaoit')
    },function(err,user){
        if(err){
            return next(err);
        }

        if(!user) {
            return res.status(200).json({
                err_code:1,
                message:'Email or passworld is invalid.'
            });
        }

        //登录成功，使用 Session 记录用户的登录状态(依赖包：express-session)
        req.session.isLogin = user;

        res.status(200).json({
            err_code:0,
            message:'OK'
        });
    })
})

// 渲染注册页面
router.get('/register',function(req,res,next){
    res.render('register.html');
})

// 提交注册信息发起 post 请求
router.post('/register',function(req,res,next){
    var body = req.body;
    User.findOne({
        $or:[
            {
                email:body.email
            },{
                nickname:body.nickname
            }
        ]
    },function(err,data){
        if(err){
            return next(err);
        }else if(data){
            return res.status(200).json({
                err_code:1,
                message:'邮箱或昵称已存在'
            });
        }

        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password+'miaoit')+'miaoit')

        new User(body).save(function(err,user){
            if(err){
                return next(err);
            }

            //注册成功，使用 Session 记录用户的登录状态(依赖包：express-session)
            req.session.isLogin = user;

            res.status(200).json({
                err_code:0,
                message:'OK'
            });
        })
    })
})

// 渲染个人主页
router.get('/personal',function(req,res,next){
    if(req.session.isLogin){
        res.render('personal.html',{
            user:req.session.isLogin
        });
    }else{
        res.redirect('/404.html');
    }
    
})

// 个人主页保存数据
router.post('/personal',function(req,res,next){
    var body = req.body;

    body.lastModifiedTime = new Date();
    body._id = body.id.replace(/"/g,'')
    User.findByIdAndUpdate(body._id,body,function(err){
        if(err){
            return next(err);
        }
        req.session.isLogin = body;

        res.status(200).json({
            err_code:0,
            message:'OK'
        });
    })
})

// 修改密码
router.post('/passwordChange',function(req,res,next){
    var body = req.body;

    body.lastModifiedTime = new Date();
    body._id = body.id.replace(/"/g,'');
    body.password = md5(md5(body.password+'miaoit')+'miaoit')
    User.findOneAndUpdate({
        _id:body._id,
        password:body.password
    },{
        lastModifiedTime:body.lastModifiedTime,
        password:md5(md5(body.password1+'miaoit')+'miaoit')
    },function(err,user){
        if(err){
            return next(err);
        }

        if(!user) {
            return res.status(200).json({
                err_code:1,
                message:'Email or passworld is invalid.'
            });
        }
        
        if(body.password1 != body.password2){
            return res.status(200).json({
                err_code:2,
                message:'密码不一致！'
            });
        }

        body.password = md5(md5(body.password1 +'miaoit')+'miaoit')

        req.session.isLogin = user;

        res.status(200).json({
            err_code:0,
            message:'OK'
        });
    })
})

//  渲染发表文章页面
router.get('/article',function(req,res,next){
    if(req.session.isLogin){
        res.render('article.html',{
            user:req.session.isLogin
        });
    }else{
        res.redirect('/404.html');
    }
    
})

//  发表文章
router.post('/article',function(req,res,next){
    var body = req.body;

    Article.find(function(err,ret){
        if(err){
            return next(err);
        }

        var nd = new Date();
        var hh = nd.getHours().toString().padStart(2,'0');
        var mi = nd.getMinutes().toString().padStart(2,'0');
        var num = ret.length.toString().padStart(3,'0');
        var ran = Math.floor(Math.random()*9)+1;
        var ran1 = Math.floor(Math.random()*10);
        var ran2 = Math.floor(Math.random()*10);
        var ran3 = Math.floor(Math.random()*10);
        body.textId = `${ran}${ran1}${hh}${mi}${num}${ran2}${ran3}`;

        new Article(body).save(function(err,user){
            if(err){
                return next(err);
            }
    
            res.status(200).json({
                err_code:0,
                message:'OK'
            });
        })
    });
})

//  渲染文章详情页面
router.get('/details',function(req,res,next){
    Article.findOne({
        textId:req.query.p
    },function(err,ret){
        if(err){
            return next(err);
        }

        // 浏览次数 + 1
        Article.findOneAndUpdate({
            textId:req.query.p
        },{
            browse:ret.browse + 1
        },function(err,user){
            if(err){
                return next(err);
            }

            // 根据 id 查找作者
            User.findById(ret.userId,function(err,data){
                if(err){
                    return next(err);
                }

                ret.nickname = data.nickname;
                ret.browse = ret.browse + 1;
                res.render('details.html',{
                    articles: ret,
                    user:req.session.isLogin
                });
            })
        })
    });
})

// 处理来自页面的ajax请求 single 文件上传
router.post('/upload', upload.single('file'),function (req, res,next) {
    var dir_file = `./public/Avatar/newAvatar/${req.file.filename}`;
    var dir2 = `./public/Avatar/${req.query.id}`;
    var creatuuid = uuid.v4().slice(0,8);
    var dir3 = `${dir2}/${creatuuid}${req.file.filename}`;
    if(!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
    }

    fs.rename(dir_file,dir3,function(err){
        if(err){
            return next(err);
        }

        User.findByIdAndUpdate(req.query.id,{
            avatar:dir3
        },function(err){
            if(err){
                return next(err);
            }
    
            req.session.isLogin.avatar = dir3;
            req.session.isLogin = req.session.isLogin;

            res.status(200).json({
                err_code:0,
                message:dir3
            });
        })
    })
})

// 404
router.get('/404.html',function(req,res,next){
    res.render('404.html');
})

// 退出
router.get('/logout',function(req,res,next){
    //清除登录状态
    req.session.isLogin = null;
    delete req.session.isLogin;

    //重定向到登录页
    res.redirect('/login');
})

// 处理 404 页面
router.get('*', function (req, res,next){
    res.redirect('/404.html');
});

// 处理 404 页面
router.use(function(err,req, res,next){
    res.redirect('/404.html');
})

// 3.把router 导出
module.exports = router;
