var express = require('express');
var router = express.Router();
var request = require('sync-request')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/search', function (req, res, next) {
  var result = request("GET", "https://musicbrainz.org/ws/2/artist?query=" + req.body.artist + "&fmt=json", { headers: { "user-agent": "http://myawesometagger.example.com" } })

  result = JSON.parse(result.body);
  res.render('search', { title: 'Express', result });

});

router.get('/discographie', function (req, res, next) {
  var result = request("GET", "https://musicbrainz.org/ws/2/release?query=artist:" + req.query.artist + "&fmt=json", { headers: { "user-agent": "http://myawesometagger.example.com" } })
  var exist = false;
  var albumList = [];

  result = JSON.parse(result.body);
  for (var i = 0; i < result.releases.length; i++) {
    exist = false;
    for (var j = 0; j < albumList.length; j++) {
      if (albumList[j] == result.releases[i].title) {
        exist = true;
      }
    }
    if (!exist) {
      albumList.push(result.releases[i].title);
    }
  }

  res.render('discographie', { title: 'Express', artist: req.query.artist, result: albumList });
});

module.exports = router;
