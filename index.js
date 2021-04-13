const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');
const Account = require('./models/account');
const session = require('express-session');
const methodOverride = require('method-override');

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
app.use(express.json());
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
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.locals.session = session;
  next();
});

const checkCart = async () => {
  if (session.cart) {
    const idInCart = session.cart.map((item) => item.itemDetails._id);
    const itemsInCartAndDB = await Product.find({ _id: { $in: idInCart } });
    const idInCartAndDB = itemsInCartAndDB.map((item) => '' + item._id);
    session.cart = session.cart.filter((item) =>
      idInCartAndDB.includes('' + item.itemDetails._id)
    );
  }
};

const cartContains = (id, size) => {
  const itemInCart = session.cart.map((item) => [
    item.itemDetails._id,
    item.size,
  ]);
  for (let item of itemInCart) {
    if (item[0] + '' === id + '' && item[1] === size) return true;
  }
  return false;
};

const findItemInCart = (id, size) => {
  return session.cart.filter(
    (item) => item.itemDetails._id + '' === id + '' && item.size === size
  )[0];
};

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
  checkCart();
  res.render('cart');
});

app.post('/cart', async (req, res) => {
  const { productId, size, qty } = req.body;
  if (!session.cart) {
    session.cart = [];
  }
  if (productId) {
    if (cartContains(productId, size)) {
      const itemInCart = findItemInCart(productId, size);
      itemInCart.qty = parseInt(itemInCart.qty) + parseInt(qty);
    } else {
      const cartItem = {
        itemDetails: await Product.findById(productId),
        size,
        qty: parseInt(qty),
      };
      session.cart.push(cartItem);
    }
  }
  res.redirect('/');
});

app.patch('/cart', (req, res) => {
  const { id, size, qty } = req.body;
  if (session.cart) {
    if (cartContains(id, size)) {
      const item = findItemInCart(id, size);
      item.qty = parseInt(qty);
    }
  }
  res.send('update OK');
});

app.delete('/cart/:id/:size', (req, res) => {
  const { id, size } = req.params;
  if (session.cart)
    session.cart = session.cart.filter(
      (item) => !(item.itemDetails._id + '' === id + '' && item.size === size)
    );
  res.redirect('/cart');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const {
    firstName,
    lastName,
    birthday,
    gender,
    email,
    password,
    tel,
  } = req.body;

  const newAccount = new Account({
    firstName,
    lastName,
    birthday,
    gender,
    email,
    password,
    tel,
  });
  newAccount.save();

  res.redirect('/');
});

port = 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
