let mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    title: String,
    img: String,
});

var movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;