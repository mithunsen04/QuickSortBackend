


const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    
  },
});

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
