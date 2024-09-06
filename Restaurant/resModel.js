const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  restaurantName: {
    type: String,
    required: [true, 'Name is Required'],
  },
  restaurantImage: {
    type: String,
    required: [true, 'Image is Required'],
  },
  restaurantDescription: {
    type: String,
    required: [true, 'Description is Required'],
  },
  restaurantAddress: {
    type: String,
    required: [true, 'Address is Required'],
  },
  restaurantPhone: {
    type: String,
    required: [true, 'Phone is Required'],
  },
  restaurantEmail: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
    validate: {
      validator: validator.isEmail(),
      message: 'Please enter a valid email',
    },
  },
  restaurantMenu: {
    type: Array,
    // required: [true, 'Menu is Required'],
  },
  restaurantDeviveryInfo: {
    // type: Array,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = restaurant;
