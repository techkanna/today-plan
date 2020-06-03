const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserModel = mongoose.model('todouser', userSchema);
