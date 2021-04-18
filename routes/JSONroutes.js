const router = require('express').Router();
const session = require('express-session');
const passport = require('passport');

const Product = require('../models/product');
const Account = require('../models/account');

const getUnexpiredProducts = async (query, skip, limit, sortOptions) => {
  const products = await Product.find({
    expireDate: { $gte: Date.now() },
    ...query,
  })
    .skip(skip)
    .sort(sortOptions)
    .limit(limit);

  return products;
};

router.get('/time', async (req, res) => {
  const { id } = req.query;
  const product = await Product.findById(id + '');
  res.send({ expireDate: product.expireDate.getTime() });
});

router.get('/productsbatch', async (req, res) => {
  const { b, q } = req.query;
  let products = {};
  if (!q) {
    products = await getUnexpiredProducts({}, b * 50, 50, {
      preOrdered: 1,
    });
  } else {
    products = await getUnexpiredProducts(
      {
        $text: { $search: q },
      },
      b * 50,
      50,
      { preOrdered: 1 }
    );
  }

  res.send({ products });
});

module.exports = router;
