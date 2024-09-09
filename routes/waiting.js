var express = require('express');
const isLoggedIn = require('../utils/middleware/isLoggedIn');
var router = express.Router();
const db = require('../database');

/* GET home page. */
router.get('/', isLoggedIn, async function (req, res, next) {
  try {
    const lobbies = await new Promise((resolve, reject) => {
      db.sql.all(
        `SELECT lobbies.*, user.username AS creator_name, user.email AS creator_email 
         FROM lobbies 
         JOIN user ON lobbies.creator_email = user.email`,
        function (err, rows) {
          if (err) {
            console.log(err);
            return reject(new Error('Lobby bulunamadı'));
          }
          console.log(rows);
          resolve(rows);
        }
      );
    });
    res.render('waiting', { lobbies, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
