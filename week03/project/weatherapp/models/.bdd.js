var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

let mongoDBLink = 'Replace by the link to your mongoDB cluster'

mongoose.connect(mongoDBLink, options,
    function (err) {
        console.log(err);
    }
);

var citySchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_min: Number,
    temp_max: Number
});

var cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;