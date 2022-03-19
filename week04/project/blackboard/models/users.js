var mongoose = require('mongoose')


var userSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "age": Number,
    "status": String,
    "gender": String,
    "dateInsert": Date,

    "messages": [{
        "title": String,
        "content": String,
        "dateExp": {
            "$date": Date
        },
        "read": Boolean,
        "sender": String
    }],
    "tasks": [{
        "name": String,
        "category": String,
        "owner": String,
        "dateInsert": Date,
        "dateDue": Date,
        "dateCloture": Date,
    }],
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;