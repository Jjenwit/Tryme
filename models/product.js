const mongoose = require('mongoose');
const Schema = mongoose.Schema;

productSchema = new Schema({
  name: String,
  images: [String],
  description: String,
  price: Number,
  sizes: [String],
});

module.exports = mongoose.model('Product', productSchema);
