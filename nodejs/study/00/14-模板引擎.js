var template = require('art-template');

var ret = template.render('Hello {{ name }}',{
    name:'Sheng',
})

console.log(ret);