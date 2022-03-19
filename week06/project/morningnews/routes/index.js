var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let UserModel = require('../models/userSchema');
let ArticleModel = require('../models/articleSchema')
var bcrypt = require('bcrypt');
var uid2 = require('uid2');
const uid = require('uid2');
const cost = 10;



/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-up', async function (req, res, next) {
  let messages = []
  let errorToggle = false;

  if (req.body.username.trim() === '') {
    messages.push('Invalid username')
    errorToggle = true;
  }
  if (req.body.email.trim() === '') {
    messages.push('Invalid email')
    errorToggle = true;
  }
  if (req.body.password.trim() === '') {
    messages.push('Invalid password')
    errorToggle = true;
  }
  if (errorToggle) {
    return res.json({ result: false, username: null, messages, token: null })
  }

  var userExist = await UserModel.findOne({ email: req.body.email })
  if (userExist) {
    messages.push('Invalid email: Already used')
    return res.json({ result: false, username: null, messages, token: null })
  }

  const hash = bcrypt.hashSync(req.body.password, cost);
  var newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    article: [],
    password: hash,
    token: uid2(32),
    language: req.body.language
  })
  var verif = await newUser.save();
  if (verif) {
    return res.json({ result: true, username: verif.username, messages, token: verif.token })
  }
  res.json({ result: false, username: null, messages, token: null })
})

router.get('/sign-in', async function (req, res, next) {
  let messages = []
  let errorToggle = false

  if (req.query.email.trim() === '') {
    messages.push('Invalid email')
    errorToggle = true
  }
  if (req.query.password.trim() === '') {
    messages.push('Invalid password')
    errorToggle = true
  }
  if (errorToggle) {
    return res.json({ result: false, username: null, messages, token: null })
  }

  let user = await UserModel.findOne({ email: req.query.email })
  if (user) {
    if (bcrypt.compareSync(req.query.password, user.password)) {
      return res.json({ result: true, username: user.username, messages, token: user.token })
    }
    messages.push('Error: user not found')
    return res.json({ result: false, username: null, messages, token: null })
  }
  messages.push('Error: user not found')
  res.json({ result: false, username: null, messages, token: null })
})


router.post('/test', async function (req, res, next) {
  let user = await UserModel.findOne({ token: req.body.token })

  let article = new ArticleModel({
    content: req.body.content,
    title: req.body.title,
    url: req.body.url,
    urlToImage: req.body.urlToImage,
    language: req.body.language
  })
  var savedArticle = await article.save()
  user.articles.push(savedArticle)

  let savedData = await user.save();
  res.json({ result: true, savedData })
})

router.post('/getTest', async function (req, res, next) {
  let user = await UserModel.findOne({ token: req.body.token }).populate('articles').exec()
  res.json({ result: true, user })
})

router.post('/deleteArticle', async function (req, res, next) {
  let user = await UserModel.findOne({ token: req.body.token }).populate('articles').exec()

  var tab = user.articles;
  let temp = tab.filter(elem => elem.title !== req.body.title)
  user.articles = temp;
  await user.save()
  res.json({ result: true, user })
})

module.exports = router;
