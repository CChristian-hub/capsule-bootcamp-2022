var mongoose = require('mongoose')

var articleSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    weight: Number,
    img: String
});


var articleModel = mongoose.model('articles', articleSchema);

module.exports = articleModel;