var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/zzs', {useNewUrlParser: true});

var articleSchema = new Schema({
    userId:{
        type:String,
        required:true
    },textId:{
        type:String,
        required:true
    },title:{
        type:String,
        required:true
    },introduction:{
        type:String,
        required:true
    },content:{
        type:String,
        required:true
    },createdTime:{
        type:Date,
        default:Date.now
    },browse:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Article', articleSchema);