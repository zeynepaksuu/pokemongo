var express = require('express');
var router = express.Router();
var get_poke = require('../helpers/getpoke'); //getpoke fonksiyonu için path

/* GET home page. */
router.get('/', async function (req, res) {
  try {
    let result = await get_poke(); //getpoke fonksiyonunun sonucunu bekler
    // console.log(result.length);
    res.json(result);
  } catch (err) {
    res.status(500).send('pokemon verileri getirilirken hata');
  }
});

module.exports = router;

//awaitle get_pokeyi bekletip async yapıcaz
