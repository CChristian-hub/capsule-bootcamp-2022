let mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

let mongoLink = 'Your mongoDB link'

mongoose.connect(mongoLink, options,
    function (err) {
        if (err) {
            console.log(`error, failed to connect to the database because --> ${err}`);
        } else {
            console.info('*** Database connection : Success ***');
        }
    }
);