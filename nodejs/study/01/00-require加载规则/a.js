require('./b.js');

//优先从缓存中加载
//y由于已经在 b 中已经加载过 c.js 了，所以这里不会有输出
var fn = require('./c.js');

console.log(fn);
/*
    node 加载第三方模块
        使用的时候通过 require('包名') 的方式来进行加载才可以使用
        不可能有任何一个第三方包和核心模块的名字是一样的
        既不是核心模块、也不是路径形式的模块

        例如：
            var template = require('art-template');
        加载步骤：
            先找到当前文件所处目录中的 node_modules 目录
            node_modules/art-template
            node_modules/art-template/package.json 文件
            node_modules/art-template/package.json 文件中的 main 属性
            main 属性中就记录了 art-template 的入口模块(index.js)
            然后加载使用这个第三方包
            实际上最终加载的还是文件 (index.js)

        如果 package.json 文件不存在或者 main 指定的入口模块也没有
        则 node 会自动找该目录下的 index.js，也就是说index.js会作为一个默认备选项
        
        如果以上所有任何一个条件都不成立，则会进入上一级目录中的node_modules目录查找
        如果上一级还没有，则继续往上上一级查找
        如果直到当前磁盘根目录还找不到，最后报错：
        can not find module xxx
*/