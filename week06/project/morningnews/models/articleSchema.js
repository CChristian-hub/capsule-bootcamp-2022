let mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    content: String,
    title: String,
    url: String,
    urlToImage: String,
    language: String
})

var ArticleModel = mongoose.model('articles', articleSchema);

module.exports = ArticleModel;