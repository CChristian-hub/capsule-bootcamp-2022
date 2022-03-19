var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var fs = require('fs');
var request = require('sync-request');




var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'your cloud name',
  api_key: 'your api key',
  api_secret: 'you api secret'
});



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', async function (req, res, next) {
  let picture = './tmp/' + uniqid() + '.jpg'

  var resultCopy = await req.files.picture.mv(picture);
  var result = await cloudinary.uploader.upload(picture, { folder: 'faceup-app' })

  var options = {
    json: {
      apiKey: "your api key",
      image: result.url
    },
  };

  var resultDetectionRaw = await request('POST', 'https://lacapsule-faceapi.herokuapp.com/api/detect', options);

  var resultDetection = await resultDetectionRaw.body;
  resultDetection = await JSON.parse(resultDetection);
  console.log(resultDetection)

  if (!resultCopy || !result) {
    fs.unlinkSync(picture);
    return res.json({ result: true, message: 'File uploaded!', url: result.url, face: resultDetection });
  } else {
    return res.json({ result: false, message: resultCopy });
  }
})


router.post('/upload-video', async function (req, res, next) {
  let video = './tmp/' + uniqid() + '.mp4'

  var resultCopy = await req.files.video.mv(video);
  var result = await cloudinary.uploader.upload(video, { resource_type: "video", folder: 'my_videos' })

  if (!resultCopy || !result) {
    fs.unlinkSync(video);
    return res.json({ result: true, message: 'File uploaded!', videoUrl: result.url });
  } else {
    return res.json({ result: false, message: resultCopy });
  }
})

router.post('/upload-thumbnail', async function (req, res, next) {
  let picture = './tmp/' + uniqid() + '.jpg'

  var resultCopy = await req.files.picture.mv(picture);
  var result = await cloudinary.uploader.upload(picture, { folder: 'my_videos_thumbnails' })

  if (!resultCopy || !result) {
    fs.unlinkSync(picture);
    return res.json({ result: true, message: 'File uploaded!', url: result.url });
  } else {
    return res.json({ result: false, message: resultCopy });
  }
})


module.exports = router;
