//入口

// 导入 jQuery
// import $ from 'jquery'
import $ from './js/jquery.js'

$(function () {
    $('li:odd').css('backgroundColor', 'yellow')
    $('li:even').css('backgroundColor', function () {
        return '#' + 'D97634'
    })
})