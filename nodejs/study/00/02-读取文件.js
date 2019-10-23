//浏览器中的 Javascript 是没有文件操作的能力的
//但是Node中的 Javascript 具有文件操作的能力

// fs 是 file-system 的简写，就是文件系统的意思
//在 Node 中如果想要进行文件操作，就必须引入fs 这个核心模块
//在 fs 这个核心模块中，就提供了所有的文件操作相关的 API
//例知：fs.readFi1e 就是用来读取文件的


//1.使用require 方法加载fs核心模块
var fs = require("fs");

//2.读取文件
// 第一个参数就是要读取的文件路径
// 第二个参数是一个回调函数

    /*
        成功
            data数据
            error null
        失败
            data null
            erroe 错误对象
    */
   fs.readFile("./hello.txt",function (error,data){
    //文件中存储的其实部是二进制数据 0 1
    //这里为什么看到的不是 0 和 1 呢？原因是二进制转为 16 进制了
    //但是无论是二进制还是16遗制，人类都不认识
    //所以我们可以通过 toString 方法把其转为我们能认识的字
    // console.log(data);//<Buffer e6 88 91 e7 88 b1 e5 ad a6 e4 b9 a0 0d 0a 68 65 6c 6c 6f 20 77 6f 72 6c 64 0d 0a 31 32 33 34 35>
    
    // console.log(error);
    // console.log(data)
    // console.log(data.toString());

    if(error){
        console.log("读取文件失败！")
    }else{
        console.log(data.toString());
    }
})

// var fs = require("fs");

// fs.readFile("./hello.txt",function (error,data){
//     if(error){
//         console.log("读取文件失败！")
//     }else{
//         console.log(data.toString());
//     }
// })