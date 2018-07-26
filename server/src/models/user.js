const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  profileId: Number,
  name: String,
  mail: String,
  pass: String,
  provider: String,
  token: String,
  active: Boolean,
  created: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('users', UserSchema);
