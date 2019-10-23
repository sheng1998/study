var uuid = require('node-uuid');// 加载 node-uuid 模块(生成唯一标识符中间件)
// uuid.v1(); -->基于时间戳生成  （time-based）
// uuid.v4(); -->随机生成  (random)

console.log(uuid.v1());