module.exports = (req, res, next) => {
    //kullanıcının sessionı var mı diye kontrol ediyoruz
    if (req.session && req.session.user) {
      // Kullanıcı oturum açmışsa, devam et
      next();
    } else {
      // Kullanıcı oturum açmamışsa, giriş sayfasına yönlendir
      res.redirect('/');
    }
  };