var express = require('express');
var router = express.Router();
var articleModel = require('../models/articles');
var orderModel = require('../models/orders')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', async function (req, res, next) {
  var articles = await articleModel.find({ stock: { $lt: 3 } });
  var user = await userModel.findById("5c52e4efaa4beef85aad5e52");
  var unread = 0;
  var undone = 0;

  for (var i = 0; i < user.messages.length; i++) {
    if (!user.messages[i].read) {
      unread++
    }
  }
  for (var i = 0; i < user.tasks.length; i++) {
    if (!user.tasks[i].dateCloture) {
      undone++;
    }
  }
  res.render('index', { unavailableArticles: articles.length, unreadCount: unread, undoneCount: undone });
});

/* GET tasks page. */
router.get('/tasks-page', async function (req, res, next) {
  var user = await userModel.findById("5c52e4efaa4beef85aad5e52");
  res.render('tasks', { user });
});

/* GET Messages page. */
router.get('/messages-page', async function (req, res, next) {
  var user = await userModel.findById("5c52e4efaa4beef85aad5e52");
  res.render('messages', { user });
});


/* GET Users page. */
router.get('/users-page', async function (req, res, next) {
  var users = await userModel.find({ status: "customer" });
  res.render('users', { users });
});

/* GET Catalog page. */
router.get('/catalog-page', async function (req, res, next) {
  var articles = await articleModel.find();
  res.render('catalog', { articles });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function (req, res, next) {
  var orders = await orderModel.find();
  res.render('orders-list', { orders });
});

/* GET Order detail page. */
router.get('/order-page', async function (req, res, next) {
  var order = await orderModel.findById(req.query.orderId).populate('articles').exec();
  res.render('order', { order });
});

/* GET chart page. */
router.get('/charts', async function (req, res, next) {
  var users = await userModel.find({ status: 'customer' });
  var maleCount = 0;
  var femaleCount = 0;
  for (var i = 0; i < users.length; i++) {
    if (users[i].gender === "male") {
      maleCount++;
    } else {
      femaleCount++;
    }
  }
  var readMessages = 0;
  var unreadMessages = 0;
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < users[i].messages.length; j++) {
      if (users[i].messages[j].read) {
        readMessages++;
      } else {
        unreadMessages++;
      }
    }
  }
  var aggregate = orderModel.aggregate();
  aggregate.match({ "status_payment": "validated" });
  aggregate.group({ _id: "$status_shipment", count: { $sum: 1 } });
  var ordersData = await aggregate.exec();
  var paidShipped = 0;
  var paidNotShipped = 0;

  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i]._id === false) {
      paidNotShipped = ordersData[i].count
    }
    if (ordersData[i]._id === true) {
      paidShipped = ordersData[i].count;
    }
  }


  var aggregate2 = orderModel.aggregate();
  aggregate2.match({ "status_payment": "validated" });
  aggregate2.group({ _id: { month: { $month: '$date_payment' } }, total: { $sum: "$total" } });
  var ordersD = await aggregate2.exec();
  ordersD = ordersD.sort();
  var ordersD = ordersD.filter(elem => elem._id.month != null)
  ordersD = JSON.stringify(ordersD);

  res.render('charts', { maleCount, femaleCount, readMessages, unreadMessages, paidShipped, paidNotShipped, ordersD });
});



module.exports = router;
