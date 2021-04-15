const express = require('express');
const session = require('express-session');

const mongoose = require('mongoose');
const Product = require('./models/product');
const Account = require('./models/account');

const passport = require('passport');

const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const logger = require('morgan');

//initialize
const app = express();

mongoose.connect('mongodb://localhost:27017/tryme', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to database');
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(
  session({
    name: 'trymecookie',
    secret: 'have to change this',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  '/splide',
  express.static(__dirname + '/node_modules/@splidejs/splide/dist/')
);
app.use(
  '/splide-grid',
  express.static(
    __dirname + '/node_modules/@splidejs/splide-extension-grid/dist/'
  )
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(function (req, res, next) {
  res.locals.session = session;
  next();
});

app.use('/', require('./routes/routes'));
app.use('/', require('./routes/JSONroutes'));

// app.use(function (req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err,
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {},
//   });
// });

//listen
port = 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
