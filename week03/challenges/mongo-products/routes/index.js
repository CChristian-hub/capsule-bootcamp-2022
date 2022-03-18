var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');


var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// --------------------- BDD -----------------------------------------------------

let mongoDBLink = 'Replace by the link to your mongoDB cluster'

mongoose.connect(mongoDBLink, options, function (err) {
  if (err) {
    console.log(`error, failed to connect to the database because --> ${err}`);
  } else {
    console.info('*** Database connection : Success ***');
  }
});

var productSchema = mongoose.Schema({
  name: String,
  stock: Number,
  isOnline: Boolean,
  category: String
});

var productModel = mongoose.model('products', productSchema);

var categories = ["Books", "Toys", "Computers", "Food"]
var online = [true, false]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/save', async function (req, res, next) {
  var count = 50

  for (var i = 0; i < count; i++) {
    let productCategory = categories[Math.floor(Math.random() * Math.floor(categories.length))]
    let isOnline = online[Math.floor(Math.random() * Math.floor(online.length))]
    let productName = productCategory + Math.floor(Math.random() * Math.floor(100000))

    var newProduct = new productModel({
      name: productName,
      stock: Math.floor(Math.random() * Math.floor(1000)),
      isOnline: isOnline,
      category: productCategory,
    });

    await newProduct.save();
  }
  res.render('index', { title: 'Express' });
});

router.get('/display', async function (req, res, next) {
  var products = await productModel.find();

  if (!products) {
    return res.render('index');
  }
  res.render('display', { products, boxChecked: false });
});

router.post('/filter', async function (req, res, next) {
  var products = await productModel.find();
  var temp = products;
  var boxcheck = false;

  if (req.body.filterOnline) {
    temp = temp.filter(elem => elem.isOnline === true);
    boxcheck = true;
  }
  if (req.body.minStock) {
    temp = temp.filter(elem => elem.stock > parseInt(req.body.minStock));
  }
  if (req.body.maxStock) {
    temp = temp.filter(elem => elem.stock < parseInt(req.body.maxStock));
  }
  if (req.body.category) {
    temp = temp.filter(elem => elem.category === req.body.category);
  }
  res.render('display', { products: temp, boxChecked: boxcheck });
});


module.exports = router;
