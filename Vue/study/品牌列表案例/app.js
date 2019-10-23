var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//cnpm i -S express body-parser mongoose

var app = express();
var Schema = mongoose.Schema;

//配置 body-parser 中间件(插件，专门用来解析表单post请求体)[需要安装 body-parser 包]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/vueDemo', { useNewUrlParser: true });// jiekou为数据库名，可以改

var productSchema = new Schema({
    id: {
        type: Number,
        required: true
    }, name: {
        type: String,
        required: true
    }, ctime: {
        type: String,
        required: true
    }, state: {
        type: Number,
        enum: [0, 1],
        default: 1
    }
})

var Product = mongoose.model('Product', productSchema);

app.get('/getproduct', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//设置允许跨域的域名，*代表允许任意域名跨域

    Product.find({
        state: 1
    }, function (err, data) {
        if (err) {
            return res.status(200).json({
                code: 500,
                message: err
            });
        }
        res.status(200).json({
            status: 0,
            message: data
        });
    });
})

app.post('/addproduct', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//设置允许跨域的域名，*代表允许任意域名跨域
    var body = req.body;//body 就是前端表单的数据
    var ID = 0;
    Product.find(function (err, data) {
        if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        } else {
            ID = data.length + 1;
        }
        new Product({
            id: ID,
            name: body.name,
            ctime: new Date()
        }).save(function (err, ret) {
            if (err) {
                console.log('保存失败');
                return res.status(200).json({
                    status: 500,
                    message: err
                });
            } else {
                res.status(200).json({
                    status: 0,
                    message: 'OK'
                });
            }
        })
    });

})

app.get('/delproduct', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//设置允许跨域的域名，*代表允许任意域名跨域
    Product.findOneAndUpdate({
        id:req.query.id
    },{
        state:0
    },function(err){
       if (err) {
            return res.status(200).json({
                status: 500,
                message: err
            });
        }

        res.status(200).json({
            err_code:0,
            message:'OK'
        });
    })
})

app.listen(3000, function () {
    console.log('app is running at port 3000.');
})
