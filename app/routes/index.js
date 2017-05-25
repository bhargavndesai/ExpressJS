const express = require('express');
const router = express.Router();
router.get('/', function (req , res) {

const data = req.app.get('appData');
let pagePhotos = [];
let pageSpeakers = data.speakers;

data.speakers.forEach(function (item) {
  pagePhotos = pagePhotos.concat(item.artwork);
});
res.render('index', {
pageTitle: "Home",
artwork: pagePhotos,
speakers: pageSpeakers,
pageId: "home"

});

})

module.exports = router;
//  res.send(`
    //<link rel = "stylesheet" type="text/css" href="/css/style.css">
    //<h1>Welcome</h1>
    //<img src="/images/misc/background.jpg" alt="background" style="height: 300px">
    //<p>Roux Acadamey meetups put together artis from all walks of life</p>
    //<script src="/reload/reload.js"><script>
  //`);
