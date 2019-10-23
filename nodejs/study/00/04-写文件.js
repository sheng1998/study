var fs = require('fs');

/*
    参数1：文件路径
    参数2：文件内容
    参数3：回调函数
*/
fs.writeFile('zzs.txt',"大家好。123456，hello",function(error){
    if(error){
        console.log("文件写入失败");
    }else{
        console.log("文件写入成功");
    }
})