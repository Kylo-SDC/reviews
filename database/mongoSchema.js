const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  _id: Number,
  restaurantId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
  overall: {
    type: Number,
    required: true,
  },
  food: {
    type: Number,
    required: true,
  },
  service: {
    type: Number,
    required: true,
  },
  ambience: {
    type: Number,
    required: true,
  },
  dineDate: {
    type: Date,
    required: true,
  },
  noise: {
    type: Number,
    required: true,
  },
  recommend: {
    type: Boolean,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  filterTag: {
    type: String,
    required: true,
  },
  vip: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = reviewSchema;
