var express = require('express');
var router = express.Router();
var db = require('../database'); //database.jsin yolunu verdik

// Veritabanından veri çekme
router.get('/', (req, res) => {
  const query = 'SELECT * FROM scoreboard'; // Sorgunu
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Sorgu hatası:', err.message); // Hata mesajı
      res.status(500).send('Sorgu hatası');
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
