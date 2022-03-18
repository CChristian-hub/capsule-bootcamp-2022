var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

let mongoDBlink = 'Your link'

mongoose.connect(mongoDBlink, options,
    function (err) {
        console.log(err);
    }
);

var contactSchema = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0, max: 120 },
    relation: { type: String, enum: ["famille", "amis", "pro"] }
});


module.exports = mongoose.model('contacts', contactSchema);
