const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

accountSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    gender: String,
    birthday: Date,
    email: String,
    tel: String,
    orders: {
      type: [Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  }
);

const virtual = accountSchema.virtual('fullName');
virtual.get(function (value, virtual, doc) {
  return this.firstName + ' ' + this.lastName;
});

accountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'Email is already registered',
  },
});

module.exports = mongoose.model('Account', accountSchema);
