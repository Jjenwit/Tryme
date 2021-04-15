const router = require('express').Router();
const session = require('express-session');
const passport = require('passport');

const Product = require('../models/product');
const Account = require('../models/account');

//functions
const checkCart = async () => {
  if (req.session.cart) {
    const idInCart = req.session.cart.map((item) => item.itemDetails._id);
    const itemsInCartAndDB = await Product.find({ _id: { $in: idInCart } });
    const idInCartAndDB = itemsInCartAndDB.map((item) => '' + item._id);
    req.session.cart = req.session.cart.filter((item) =>
      idInCartAndDB.includes('' + item.itemDetails._id)
    );
  }
};

const cartContains = (id, size) => {
  const itemInCart = req.session.cart.map((item) => [
    item.itemDetails._id,
    item.size,
  ]);
  for (let item of itemInCart) {
    if (item[0] + '' === id + '' && item[1] === size) return true;
  }
  return false;
};

const findItemInCart = (id, size) => {
  return req.session.cart.filter(
    (item) => item.itemDetails._id + '' === id + '' && item.size === size
  )[0];
};

const getUnexpiredProducts = async () => {
  const products = await Product.find({ expireDate: { $gte: Date.now() } });
  return products;
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
//

router.get('/', async (req, res) => {
  const products = await getUnexpiredProducts();
  topProducts = products.slice(20);
  promotionProducts = products.slice(15);
  res.render('index', { products, topProducts, promotionProducts });
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('seller');
  console.log(product);
  const relatedProducts = await Product.find({}).limit(20);
  res.render('details', { product, relatedProducts });
});

router.get('/cart', async (req, res) => {
  checkCart();
  res.render('cart');
});

router.post('/cart', async (req, res) => {
  const { productId, size, qty } = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
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
      req.session.cart.push(cartItem);
    }
  }
  res.redirect('/');
});

router.patch('/cart', (req, res) => {
  const { id, size, qty } = req.body;
  if (req.session.cart) {
    if (cartContains(id, size)) {
      const item = findItemInCart(id, size);
      item.qty = parseInt(qty);
    }
  }
  res.send('update OK');
});

router.delete('/cart', (req, res) => {
  const { id, size } = req.query;
  if (req.session.cart)
    req.session.cart = req.session.cart.filter(
      (item) => !(item.itemDetails._id + '' === id + '' && item.size === size)
    );
  res.redirect('/cart');
});

router.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('error') });
});

router.post('/signup', (req, res) => {
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
    tel,
  });

  Account.register(newAccount, password, function (err) {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/signup');
    }

    passport.authenticate('local')(req, res, function () {
      req.session.user = req.user;
      res.redirect('/');
    });
  });
});

router.get('/login', function (req, res) {
  res.render('login', { message: req.flash('error') });
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  function (req, res) {
    req.session.user = req.user;
    res.redirect('/');
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
