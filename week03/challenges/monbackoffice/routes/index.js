var express = require('express');
var router = express.Router();
var contactModel = require('./bdd');

var filtermode = null;
var filterMinAge = 0;
var filterMaxAge = 120;

/* GET home page. */
router.get('/', function (req, res, next) {
  filtermode = null;
  filterMinAge = 0;
  filterMaxAge = 120;
  res.render('index', { success: false });
});

router.get('/add-contact', function (req, res, next) {
  res.render('addContact');
});

router.post('/newContact', async function (req, res, next) {
  try {
    var newContact = new contactModel({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      age: parseInt(req.body.age),
      relation: req.body.relation,
    })
    var check = await newContact.save();

    if (!check) {
      return res.redirect('/');
    }
  } catch (error) {
    console.log(error.message);
  }
  res.render('index', { success: true });
});

router.get('/contact-list', async function (req, res, next) {
  var contactList = await contactModel.find();

  if (req.query.filter) {
    filtermode = req.query.filter;
    var contactList = await contactModel.find({ age: { $gt: filterMinAge, $lt: filterMaxAge }, relation: filtermode })
  }

  res.render('contact-list', { contactList });
});

router.post('/contact-list-filter-age', async function (req, res, next) {
  var min = 0;
  var max = 120;

  filterMinAge = min;
  filterMaxAge = max;

  if (!req.body.ageMin && !req.body.ageMax) {
  } else {
    if (!req.body.ageMin && req.body.ageMax) {
      max = req.body.ageMax;
      filterMaxAge = max;
    } else {
      if (req.body.ageMin && !req.body.ageMax) {
        min = req.body.ageMin;
        filterMinAge = min;
      } else {
        if (req.body.ageMin && req.body.ageMax) {
          min = req.body.ageMin;
          filterMinAge = min;
          max = req.body.ageMax;
          filterMaxAge = max;
        }
      }
    }
    if (filtermode) {
      var list = await contactModel.find({ age: { $gt: min, $lt: max }, relation: filtermode });
    } else {
      var list = await contactModel.find({ age: { $gt: min, $lt: max } });
    }
    res.render('contact-list', { contactList: list });
  }
});


// router.post()

router.get('/update-contact', async function (req, res, next) {

  var contact = await contactModel.findOne({ email: req.query.email });
  console.log(contact);
  res.render('update-contact', { contact });
});

router.post('/update-contact', async function (req, res, next) {
  var contact = await contactModel.findOne({ email: req.body.email });
  if (!contact) {
    return res.render('index', { success: false });
  }
  try {
    await contactModel.updateOne({ email: req.body.email }, {
      nom: req.body.nom,
      prenom: req.body.prenom,
      // email: req.body.email, this doesnt work
      age: req.body.age,
      relation: req.body.relation
    })
  } catch (error) {
    console.log(error.message);
    return res.render('index', { success: false });
  }
  res.render('index', { success: true });
})


router.get('/delete-contact', async function (req, res, next) {
  await contactModel.deleteOne({ email: req.query.email })
  var contactList = await contactModel.find();
  res.render('contact-list', { contactList });
});

module.exports = router;