const mongoose = require("mongoose");
const Schema = mongoose.Schema;

productSchema = new Schema({
  name: String,
  img: String,
  description: String,
});

module.exports = mongoose.model("Product", productSchema);
