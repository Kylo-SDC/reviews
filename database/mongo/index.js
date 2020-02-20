// database code
const mongoose = require('mongoose');
const reviewSchema = require('./mongoSchema.js');

const mongoUri = 'mongodb://localhost/reviews';
mongoose.Promise = global.Promise;

const db = mongoose.createConnection(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const Review = db.model('Review', reviewSchema);

const getRestaurantReviews = (restaurantId) => {
  return Review.find(restaurantId).sort('-dineDate');
};

const getSortedRestaurantReviews = ({ sortField, restaurantId, list, sorting }) => {
  if (sorting === 'Newest' || sorting === 0) {
    sortField = '-dineDate';
  }
  if (!list.length && sortField !== '-dineDate') {
    return Review.find({ restaurantId: restaurantId })
      .sort(sortField).sort('-dineDate')

  } else {
    return Review.find({ restaurantId: restaurantId, filterTag: { $in: list } })
      .sort(sortField).sort('-dineDate');
  }
};

// requires that all fields except the firstName and lastName
const addOneReview = (newReviewData) => {
  return Review.findOne({})
    .sort('-_id')
    .then(({_id}) => {
      newReview = new Review ({
        _id: _id + 1,
        restaurantId: newReviewData.restaurantId,
        firstName: newReviewData.firstName,
        lastName: newReviewData.lastName,
        city: newReviewData.city,
        numReviews: newReviewData.numReviews,
        overall: newReviewData.overall,
        food: newReviewData.food,
        service: newReviewData.service,
        ambience: newReviewData.ambience,
        dineDate: newReviewData.dineDate,
        noise: newReviewData.noise,
        recommend: newReviewData.recommend,
        comments: newReviewData.comments,
        filterTag: newReviewData.filterTag,
        vip: newReviewData.vip,
        color: newReviewData.color,
      });
      return newReview.save(newReviewData);
    });
};

// returns the requested review, takes the _id
const getOneReview = (reviewId) => {
  return Review.findById(reviewId);
};

// returns the updated record, takes the _id and any valid field
const updateOneReview = (reviewId, updatedFields) => {
  // need to seperate out which fields are being updated
  return Review.findByIdAndUpdate(reviewId, updatedFields, {new: true});
};

const deleteOneReview = (reviewId) => {
  return Review.findByIdAndRemove(reviewId);
};

module.exports = {
  Review: Review,
  getRestaurantReviews: getRestaurantReviews,
  getSortedRestaurantReviews,
  getOneReview: getOneReview,
  updateOneReview: updateOneReview,
  deleteOneReview: deleteOneReview,
  addOneReview: addOneReview,
};
