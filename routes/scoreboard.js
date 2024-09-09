var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', (req, res, next) => {
  const query =
    'SELECT username, user_id, score FROM scoreboard JOIN user ON scoreboard.user_id = user.id WHERE 1 ORDER BY score DESC LIMIT 10 ';
  db.sql.all(query, [], (err, rows) => {
    if (err) {
      console.error('Sorgu hatası:', err.message); // Hata mesajı
      res.status(500).send('Sorgu hatası');
    } else {
      res.render('scoreboard', { rows: rows });
      console.log(rows);
    }
  });
});

module.exports = router;

/*var express = require('express');
var router = express.Router();


// GET home page. 
router.get('/scoreboard', function(req, res, next) {
  res.render('scoreboard');
});

module.exports = router; */
