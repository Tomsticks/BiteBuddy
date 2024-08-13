const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Name is Required'],
  },
  firstname: {
    type: String,
    defualt: '',
  },
  lastname: {
    type: String,
    defualt: '',
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    defualt: '',
  },
  username: {
    type: String,
    required: [true, 'Username is Required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is Required'],
    unique: [true, 'email is in use'],
    lowercase: true,
    validate: [validator.isEmail, 'please Provide a valid Email'],
  },
  image: String,

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  phoneNumber: {
    type: Number,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const user = mongoose.model('Users', userSchema);
module.exports = user;
