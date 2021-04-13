const mongoose = require('mongoose');
const Schema = mongoose.Schema;

accountSchema = new Schema({
  firstName: String,
  lastName: String,
  gender: String,
  birthday: Date,
  email: String,
  password: String,
  tel: String,
  orders: {
    type: [Schema.Types.ObjectId],
  },
});

module.exports = mongoose.model('Account', accountSchema);
