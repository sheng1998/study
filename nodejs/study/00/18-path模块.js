var path = require('path');

//获取一个路径的文件名（默认包括扩展名）
console.log(path.basename('c:/a/b/d/hello.txt'));//hello.txt
//获取一个路径的文件名（去掉扩展名.txt）
console.log(path.basename('c:/a/b/d/hello.txt','.txt'));//hello

//获取一个路径的目录部分
console.log(path.dirname('c:/a/b/d/hello.txt'));//c:/a/b/d

//获取一个路径的扩展名部分
console.log(path.extname('c:/a/b/d/hello.txt'));//.txt

//把一个路径转为对象
console.log(path.parse('c:/a/b/d/hello.txt'));
/*
    {
        root: 'c:/',    //根路径
        dir: 'c:/a/b/d',    //目录
        base: 'hello.txt',    //包含后缀名的文件名
        ext: '.txt',    //后缀名
        name: 'hello'        //不包含后缀名的文件名
    }
*/

//路径拼接
console.log(path.join('c:/a/b/','/d/hello.txt'));//c:\a\b\d\hello.txt

//判断一个路径是否是绝对路径
console.log(path.isAbsolute('c:/a/b/d/hello.txt'));//true
console.log(path.isAbsolute('./d/hello.txt'));//false