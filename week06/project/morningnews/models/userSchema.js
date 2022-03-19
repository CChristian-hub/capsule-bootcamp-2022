let mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
    token: String,
});

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;