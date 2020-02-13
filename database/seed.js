const faker = require('faker/locale/en_US');
const Jabber = require('jabber');
const moment = require('moment');
const db = require('./mongo');

const buzzWords = ['great food', 'eat', 'service', 'drinks', 'loved', 'never again', 'dessert', 'main menu', 'appetizers', 'enjoyed', 'hated', 'server', 'noise', 'waitress', 'waiter', 'slow', 'fast', 'go again', 'clean', 'dirty', 'kids', 'our group', 'slow service', 'cold food', 'awesome drinks', 'fun time', 'romantic atmosphere', 'dinner', 'lunch', 'breakfast', 'hot plate', 'smelled wonderful', 'no alcohol', 'bartender', 'wine list', 'outdoor seating', 'large room', 'no tips', 'valet parking', 'fine dining', 'dishes', 'shrimp', 'steak', 'chicken', 'beef', 'pasta', 'cake', 'pastries', 'creme brulee', 'simmering', 'coffee', 'fresh food', 'candlelit', 'anniversary', 'birthday', 'party', 'with friends', 'evening', 'stuffed', 'would go again', 'recommend this place', 'restrooms clean', 'host greeting', 'lovely place', 'best view', 'indoor seating', 'waited an hour', 'risotto', 'baked salmon', 'fried rice', 'shrimp scampi', 'sushi', 'wait time'];

const tags = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];

const circleColors = ['#6c8ae4', '#d86441', '#bb6acd', '#df4e96'];

const jabber = new Jabber(buzzWords, 2);

const createReview = (resId, revId) => {
  const review = {};
  review._id = revId;
  review.restaurantId = resId;
  review.firstName = (Math.random() < 0.7) ? faker.name.firstName() : '';
  if (review.firstName.length) {
    review.lastName = (Math.random() < 0.7) ? faker.name.lastName() : '';
  } else {
    review.lastName = '';
  }
  review.city = faker.address.city();
  review.numReviews = Math.floor(Math.random() * (24)) + 1;
  review.overall = Math.floor(Math.random() * (4)) + 1;
  review.food = Math.floor(Math.random() * (4)) + 1;
  review.service = Math.floor(Math.random() * (4)) + 1;
  review.ambience = Math.floor(Math.random() * (4)) + 1;
  review.dineDate = moment(faker.date.between('2019-01-01', '2020-01-24')).format('YYYY-MM-DD');
  review.noise = Math.floor(Math.random() * (4)) + 1;
  review.recommend = Math.random() < 0.7;
  review.comments = jabber.createParagraph(Math.floor(Math.random() * (40)) + 10);
  review.filterTag = tags[Math.floor(Math.random() * tags.length)];
  review.vip = Math.random() < 0.3;
  review.color = circleColors[Math.floor(Math.random() * circleColors.length)];
  return review;
};

const createReviews = (numberOfRestaurants, maxNumberOfReviews) => {
  // number of restaurants (will be 100)
  const restaurantNum = numberOfRestaurants || 100;
  const reviewsArray = [];
  let prevReviewCount = 0;
  for (let i = 1; i <= restaurantNum; i += 1) {
    // number of reviews per restaurant will be 30-90 , random here
    const reviewCount = Math.floor(Math.random() * (maxNumberOfReviews)) + 5;
    for (let j = 0; j < reviewCount; j += 1) {
      prevReviewCount += 1;
      reviewsArray.push(createReview(i, prevReviewCount));
    }
  }
  return reviewsArray;
};

// function that will be called that will return an array of data
async function insertDummyData(numberOfRestaurants, maxNumberOfReviews) {
  await db.Review.insertMany(createReviews(numberOfRestaurants, maxNumberOfReviews));
}


insertDummyData(1000000, 5)
  .then(() => {
    console.log('Database seeded');
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
