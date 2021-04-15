const router = require('express').Router();
const session = require('express-session');
const passport = require('passport');

const Product = require('../models/product');
const Account = require('../models/account');

router.get('/time', async (req, res) => {
  const { id } = req.query;
  const product = await Product.findById(id + '');
  res.send({ expireDate: product.expireDate.getTime() });
});

module.exports = router;
