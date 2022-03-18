var express = require('express');
var router = express.Router();
var users = [
  { gender: "female", name: "Leanne Graham", skills: ["HTML", "CSS"], skill: 75 },
  { gender: "male", name: "Ervin Howell", skills: ["HTML", "nodeJS", "Express"], skill: 30 },
  { gender: "female", name: "Clementine Bauch", skills: ["HTML", "CSS"], skill: 49 },
  { gender: "male", name: "Kurtis Weissnat", skills: ["Javascript", "jQuery", "nodeJS", "Express"], skill: 67 },
  { gender: "female", name: "Chelsey Dietrich", skills: ["HTML", "CSS", "Javascrip", "nodeJS", "Express"], skill: 96 },
  { gender: "male", name: "Denis Schulist", skills: ["HTML", "CSS", "Javascript"], skill: 54 }
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'TechLevel', users });
});

module.exports = router;
