const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your firstName']
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your lastName']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please tell us your email']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password']
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  points: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  loses: {
    type: Number,
    default: 0
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match"
    }
  ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
