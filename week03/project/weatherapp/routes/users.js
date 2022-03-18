var express = require('express');
var router = express.Router();
var request = require('sync-request');
var cityModel = require('../models/citie');
var userModel = require('../models/user');



router.post('/sign-up', async function (req, res, next) {
    var user = await userModel.findOne({ email: req.body.email });
    if (user) {
        return res.redirect('/');
    }

    var newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });


    user = await newUser.save();
    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect('/weather');
})
router.get('/sign-up', function (req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/')
    }
    res.redirect('/');
})


router.post('/sign-in', async function (req, res, next) {
    var user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (!user) {
        return res.redirect('/');
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect('/weather');
})
router.get('/sign-in', function (req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/')
    }
    res.redirect('/');
})

router.get('/logout', function (req, res, next) {
    req.session.userId = null;
    req.session.username = null;
    res.redirect('/');
})

module.exports = router;
