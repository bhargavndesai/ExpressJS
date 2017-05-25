const express = require('express');
const router = express.Router();
const feedbackData = require('../data/feedback.json');
router.get('/api', function (req , res) {
res.json(feedbackData);

})

module.exports = router;
//  res.send(`
    //<link rel = "stylesheet" type="text/css" href="/css/style.css">
    //<h1>Welcome</h1>
    //<img src="/images/misc/background.jpg" alt="background" style="height: 300px">
    //<p>Roux Acadamey meetups put together artis from all walks of life</p>
    //<script src="/reload/reload.js"><script>
  //`);
