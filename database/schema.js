const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  restaurantId: Number,
  firstName: String,
  lastName: String,
  city: String,
  numReviews: Number,
  overall: Number,
  food: Number,
  service: Number,
  ambience: Number,
  dineDate: Date,
  noise: Number,
  recommend: Boolean,
  comments: String,
  filterTag: String,
  vip: Boolean,
  color: String,
});

module.exports = reviewSchema;
