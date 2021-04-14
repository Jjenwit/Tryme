const mongoose = require('mongoose');
const Schema = mongoose.Schema;

productSchema = new Schema(
  {
    name: String,
    images: [String],
    description: String,
    price: Number,
    sizes: [String],
    seller: { type: Schema.Types.ObjectId, ref: 'accounts' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
