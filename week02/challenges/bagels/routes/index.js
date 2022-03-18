var express = require('express');
var router = express.Router();
var bagels = [
  { title: "Bagel façon Bresse Bleu", desc: "Les fans de frommages bleu vont adorer cette recette de burger aux blancs de poulet et confit d'oignons. À accompagner de pommes de terre sautées ou de frites.", url: "/images/bagel_bleu.jpg" },
  { title: "Bagel Pizza", desc: "La pizza Bagel realise votre reve le plus fou: une pizza a realiser en quelques minutes avec comme base un bagel garni de sauce tomate, de jambon, et de fromage. Une recette idéale pour votre prochain brunch.", url: "/images/bagel_pizza.jpg" },
  { title: "Bagel Saumon", desc: "Un délicieux pain rond, ultra moelleux et grille, garni de saumon fumé et de creme", url: "/images/bagel_saumon.jpg" }
]
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Bagels' });
});

router.get('/bagel', function (req, res, next) {
  res.render('bagel', { title: 'Bagels', bagels });
})

module.exports = router;
