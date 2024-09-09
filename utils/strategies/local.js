const LocalStrategy = require('passport-local');
const db = require('../../database');

// Buradan kullanıcı adı, şifre ve callback fonksiyonunu parametre olarak alıyoruz.
const strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  function verify(email, password, done) {
    // Veritabanına bakıyoruz böyle bir isim var mı diye.
    db.sql.get(
      'SELECT * FROM user WHERE email = ?',
      [email],
      function (err, user) {
        // Eğer veri çekerken hata alırsak bunu callback fonksiyonu ile geri döndürüyoruz.
        if (err) {
          return done(err);
        }
        // Eğer kullanıcı yoksa bunu geri döndürüyoruz.
        if (!user) {
          return done(null, false, {
            message: 'Incorrect e-mail or password 123.',
          });
        }
        if (user.password !== password) {
          return done(null, false, {
            message: 'Incorrect e-mail or password 123.',
          });
        }
        return done(null, user);
      }
    );
  }
);

module.exports = strategy;
