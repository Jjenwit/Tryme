const mongoose = require('mongoose');
const Schema = mongoose.Schema;

productSchema = new Schema({
  name: String,
  img: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);
