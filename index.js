const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');
const engine = require('ejs-mate');

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

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('index', { products });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('details', { product });
});

app.get('/cart', async (req, res) => {
  res.render('cart');
});

port = 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
