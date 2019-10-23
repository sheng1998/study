var md5 = require('blueimp-md5');// 加载 blueimp-md5 模块(用于密码加密)

var sheng = 12345
console.log(sheng);
console.log(md5(sheng));
console.log(md5(sheng + 'gfgGFFTUC,$%^g13'));
console.log(md5(md5(sheng + 'gfgGFFTUC,$%^g13')+'24dfhgFRTD%^$'));