var express = require('express');
var router = express.Router();
var request = require('sync-request');
var cityModel = require('../models/citie');
var userModel = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});


router.get('/weather', async function (req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/')
  }
  var cities = await cityModel.find();
  res.render('weather', { cityList: cities })
})


router.post('/add-city', async function (req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/')
  }
  var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(req.body.newcity)}&units=metric&lang=fr&appid=`)
  var dataAPI = JSON.parse(data.body)

  var alreadyExist = false;
  var cities = await cityModel.find();


  for (var i = 0; i < cities.length; i++) {
    if (req.body.newcity.toLowerCase() == cities[i].name.toLowerCase()) {
      alreadyExist = true;
    }
  }
  if (alreadyExist == false && dataAPI.name) {
    var newCity = new cityModel({
      name: dataAPI.name,
      desc: dataAPI.weather[0].description,
      img: "http://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + ".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max,
      lon: dataAPI.coord.lon,
      lat: dataAPI.coord.lat
    })
    console.log(dataAPI);
    var citySaved = await newCity.save();
    var cities = await cityModel.find();
    console.log(newCity.lon);
    console.log(newCity.lat);
  }
  res.render('weather', { cityList: cities })
})
router.get('/add-city', function (req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/')
  }
  res.redirect('/');
})


router.get('/delete-city', async function (req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/')
  }
  await cityModel.deleteOne({ name: req.query.name })
  var cities = await cityModel.find();

  res.render('weather', { cityList: cities })
})


router.get('/update', async function (req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/')
  }
  var cities = await cityModel.find();
  for (var i = 0; i < cities.length; i++) {
    var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cities[i].name)}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`)
    var dataAPI = JSON.parse(data.body);
    await cityModel.updateOne(
      {
        name: cities[i].name
      },
      {
        desc: dataAPI.weather[0].description,
        img: "http://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + ".png",
        temp_min: dataAPI.main.temp_min,
        temp_max: dataAPI.main.temp_max,
        lon: dataAPI.coord.lon,
        lat: dataAPI.coord.lat
      }
    );
  }

  cities = await cityModel.find();
  res.render('weather', { cityList: cities });
});


module.exports = router;
