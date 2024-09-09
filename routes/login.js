var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('enterence');

});

router.post('/', passport.authenticate('local'), function (req, res) {
  res.redirect('/waiting');
  // res.render('waiting');
  //1- kullanıcı tablosunda kişi bilgileri var mı yok mu kontrol edilcek, varsa session tablosuna bir token oluşturulcak, unique id, (session id),
  // res.cookie();  , redirect- render waiting
});

module.exports = router;
