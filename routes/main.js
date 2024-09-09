var express = require('express');
var router = express.Router();
var isLoggedIn = require('../utils/middleware/isLoggedIn');

router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { title: 'Merhaba!' });
});

module.exports = router;
