## MongoDB数据库
在 nodejs 中操纵 mongodb 可以安装 mongoose 包
```shell
    npm i --save mongoose
```

#### 使用方法：
1. 引包：
```javascript
    var mongoose = require('mongoose');
```

2. 创建对象：
```javascript
    var Schema = mongoose.Schema;
```

3. 连接MongoDB 数据库(如果数据库 test 不存在，在实例化的时候会自动创建)
```javascript
mongoose.connect('mongodb://localhost/student');
```

4. 设置文档结构(表结构)
    字段名称就是表结构的属性名称
    约束的目的是为了保证数据的完整性，不要有脏数据
```javascript
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
```


5. 将文档结构发布为模型
    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名词
        mongoose 自动将大写名词的字符串生成小写复数的集合名称
        第一个参数中的 User 会变成 users 集合名称
```javascript
var User = mongoose.model('User', userSchema);
```


6. 这一步可以执行增删改查了



##### 增加数据
1. 添加一条数据

```javascript
var admin = new User({
    username:'admin',
    password:'123456',
    email:'admin@admin.com'
})
```



##### 删除数据
1. 根据条件删除所有数据
```javascript
// 用法：Model.remove(condition,[callback])
User.remove({
    username:'小庄'
},function(err,ret){
    if(err){
        console.log('删除失败');
    }else{
        console.log(ret);
    }
})
```



2. 根据条件删除一条数据
```javascript
// 用法：Model.findOneAndRemove(condition,[callback])
User.findOneAndRemove({
    username:'小庄'
},function(err,ret){
    if(err){
        console.log('删除失败');
    }else{
        console.log(ret);
    }
})
```



3. 根据id删除一条数据
```javascript
// 用法：Model.findByIdAndRemove(id,[callback])
User.findByIdAndRemove('5d847e39b38bd707f4047676',function(err,ret){
    if(err){
        console.log('删除失败');
    }else{
        console.log(ret);
    }
})
```



##### 修改数据
1. 根据条件更新所有数据
```javascript
// 用法：Model.update(condition,update,[option],[callback])
User.update({
    username: '小庄'   //条件
},{
    password: '123'    //修改的内容
},function(err,ret){
    if(err){
        console.log('更新失败');
    }else{
        console.log(ret);
    }
})
```



2. 根据条件更新一条数据
```javascript
// 用法：Model.update([condition],[update],[option],[callback])
User.findOneAndUpdate({
    username: '小庄',
    password: '123'
},{
    password: '123456'
},function(err,ret){
    if(err){
        console.log('更新失败');
    }else{
        console.log(ret);
    }
})
```



3. 根据id更新一条数据
```javascript
// 用法：Model.update(id,update,[option],[callback])
User.findByIdAndUpdate('5d847e3443a79a27d440db02',{
    password: '123'
},function(err,ret){
    if(err){
        console.log('更新失败');
    }else{
        console.log(ret);
    }
})
```



##### 查询数据
1. 查询所有数据(结果是一个数组)
```javascript
// 用法：Model.find([callback])
User.find(function(err,ret){
    if(err){
        console.log('查询失败');
    }else{
        console.log(ret);
    }
})
```



2. 按条件查询(结果是一个数组)
```javascript
// 用法：Model.find([condition],[callback])
User.find({
    username:'李四'
},function(err,ret){
    if(err){
        console.log('查询失败');
    }else{
        console.log(ret);
    }
})
```



3. 按条件查询一条数据(结果是一个对象)
```javascript
// 用法：Model.findOne([condition],[callback])
User.findOne({
    username:'老王'
},function(err,ret){
    if(err){
        console.log('查询失败');
    }else{
        console.log(ret);
    }
})
```


4. 根据id查询一条数据(结果是一个对象)
```javascript
// 用法：Model.findById(id,[callback])
User.findById('5d847e3443a79a27d440db02',function(err,ret){
    if(err){
        console.log('查询失败');
    }else{
        console.log(ret);
    }
})
```