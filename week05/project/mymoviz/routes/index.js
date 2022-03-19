var express = require('express');
var router = express.Router();
var request = require('sync-request');
var mongoose = require('mongoose');
var movieModel = require('../models/movies')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function (req, res, next) {
  let api_key = "your api key"
  var temp = request('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&language=fr-FR&sort_by=popularity.desc');
  var tempParsed = JSON.parse(temp.body);
  res.json({ result: true, movies: tempParsed.results });
})

router.get('/wishlist-movie', async function (req, res, next) {
  var movies = await movieModel.find();
  res.json({ movies });
})

router.post('/wishlist-movie', async function (req, res, next) {
  var newMovie = new movieModel({
    title: req.body.movieName,
    img: req.body.movieImg
  })
  var temp = await newMovie.save();
  if (temp) {
    return res.json({ result: true })
  }
  res.json({ result: false })
})

router.delete('/wishlist-movie/:name', async function (req, res, next) {
  var temp = await movieModel.deleteOne({ title: req.params.name })
  var result = false
  if (temp.deletedCount > 0)
    result = true
  res.json({ result })
});



module.exports = router;
