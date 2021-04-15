const mongoose = require('mongoose');
const Schema = mongoose.Schema;

productSchema = new Schema(
  {
    name: String,
    images: [String],
    description: String,
    sizes: [String],
    price: Number,
    salesDate: Date,
    expireDate: Date,
    seller: { type: Schema.Types.ObjectId, ref: 'Account' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
