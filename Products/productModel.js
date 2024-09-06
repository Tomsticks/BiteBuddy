const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side Dish'],
  },
  ingredients: {
    type: [String], // Array of strings for listing ingredients
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Out of Stock'],
    default: 'Available',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  // ratings: [
  //   {
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User',
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //       min: 1,
  //       max: 5,
  //     },
  //     comment: {
  //       type: String,
  //       trim: true,
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
});

module.exports = mongoose.model('Product', productSchema);
