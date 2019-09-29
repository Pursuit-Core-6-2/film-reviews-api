var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json({
      payload: "Welcome. Read the Docs before starting. https://github.com/Pursuit-Core-6-2/film-reviews-api",
      err: false
    })
});


module.exports = router;
