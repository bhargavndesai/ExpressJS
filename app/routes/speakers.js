const express = require('express');
const router = express.Router();

router.get('/speakers', function (req , res) {
  const data = req.app.get('appData');
  let pagePhotos = [];
  let pageSpeakers = data.speakers;
  data.speakers.forEach(function (item) {
    pagePhotos = pagePhotos.concat(item.artwork);
  });
  res.render('speakers', {
  pageTitle: "Speakers",
  artwork: pagePhotos,
  speakers: pageSpeakers,
  pageId: "speakersList"

  });
});
router.get('/speakers/:speakerid', function (req , res) {
//   var dataFile = req.app.get('appData');
//     let speaker = dataFile.speakers[req.params.speakerid];
//     res.send(`
//       <link rel = "stylesheet" type="text/css" href="/css/style.css">
//     <h1>${speaker.title}</h1>
//     <h2>with ${speaker.name}</h2>
//     <img src="/images/speakers/${speaker.shortname}_tn.jpg" alt="speaker">
//     <p>${speaker.summary}</p>
//     <script src="/reload/reload.js"><script>i
//   `);
// });
const data = req.app.get('appData');
 let pagePhotos = [];
 let pageSpeakers = [];

 data.speakers.forEach(function(item) {
   if (item.shortname == req.params.speakerid) {
     pageSpeakers.push(item);
     pagePhotos = pagePhotos.concat(item.artwork);
   }
 });

 res.render('speakers', {
   pageTitle: 'Speaker Info',
   artwork: pagePhotos,
   speakers: pageSpeakers,
   pageId: 'speakerDetail'
 });
});

module.exports = router;
