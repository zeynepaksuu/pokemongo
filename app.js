require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session'); //express sessionı ekliyoruz
var logger = require('morgan');
var db = require('./database'); //database.jsin yolunu verdik
//const get_poke = require('./helpers/getpoke.js'); //içe aktardık cunku get pokeyi burda kullanıcaz
var router = express.Router();

// Passport.js setup
const passport = require('passport');
const localStrategy = require('./utils/strategies/local.js');
const sqliteStoreFactory = require('express-session-sqlite').default;
const SqliteStore = sqliteStoreFactory(session);
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

var app = express();

app.use((req, res, next) => {
  console.log(req.method);
  // / /login /register pathlerini istisna tutmalıyız
  if (
    (req.path === '/' && req.method === 'GET') ||
    (req.path === '/login' && req.method === 'POST') ||
    (req.path === '/register' && req.method === 'POST')
  ) {
    // bu yollar için middlewareı atlamalıyız
    next();
    //return res.end("/ GET istendi");
  } else {
    //if (session.open) next(),
    //else not session open res.redirect login / - cookie okutulcak , değerini session tablosunda bakcaz, aynıysa oturum açılmış, farklıysa acılmamıs
    //diğer tüm routelarda bu çalışcak
    console.log('Time:', Date.now());
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport.js setup
app.use(
  session({
    name: 'poke_session_id',
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    store: new SqliteStore({
      driver: sqlite3.Database,
      ttl: 60 * 60 * 24 * 1000,
      path: 'mydatabase.db',
    }),
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.email);
});
passport.deserializeUser(async (email, done) => {
  await db.getUser(email).then((user) => {
    done(null, user);
  });
});

var mainRoute = require('./routes/main');
var enterenceRoute = require('./routes/enterence');
var scoreboardRoute = require('./routes/scoreboard');
var testRoute = require('./routes/test');
var dataRoute = require('./routes/data');
var waitingRoute = require('./routes/waiting');
var loginRoute = require('./routes/login');
var registerRoute = require('./routes/register');

app.use('/', enterenceRoute);
app.use('/data', dataRoute);
app.use('/game', mainRoute);
app.use('/scoreboard', scoreboardRoute);
app.use('/test', testRoute);
app.use('/waiting', waitingRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(res.locals.error);
  res.render('error');
});

module.exports = app;
