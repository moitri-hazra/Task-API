const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: true,
    unique: true
  },
  priority: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
