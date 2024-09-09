var express = require('express');
var router = express.Router();
const db = require('../database');

router.post('/', async function (req, res, next) {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }
  await db
    .createUser({ username, email, password })
    .then(() => {
      res.status(200).send({ message: 'Kullanıcı oluşturuldu.' });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: 'An error occurred.', error: err.message });
    });

});

module.exports = router;
