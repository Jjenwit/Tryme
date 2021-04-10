const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');
const session = require('express-session');

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

app.use(
  session({
    name: 'trymecookie',
    secret: 'have to change this',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.locals.session = session;
  next();
});

app.get('/', async (req, res) => {
  const products = await Product.find({});
  topProducts = products.slice(20);
  promotionProducts = products.slice(15);
  res.render('index', { products, topProducts, promotionProducts });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const relatedProducts = await Product.find({}).limit(20);
  res.render('details', { product, relatedProducts });
});

app.get('/cart', async (req, res) => {
  res.render('cart');
});

app.post('/cart', async (req, res) => {
  const { productId } = req.body;
  if (!session.cart) {
    session.cart = [];
  }
  if (productId) {
    session.cart.push(productId);
  }
  res.redirect('/');
});

port = 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
