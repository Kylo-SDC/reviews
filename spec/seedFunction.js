const faker = require('faker/locale/en_US');
const Jabber = require('jabber');
const moment = require('moment');
// const Review = require('../database');

// moment(randomDate).fromNow()

const buzzWords = ['great food', 'eat', 'service', 'drinks', 'loved', 'never again', 'dessert', 'main menu', 'appetizers', 'enjoyed', 'hated', 'server', 'noise', 'waitress', 'waiter', 'slow', 'fast', 'go again', 'clean', 'dirty', 'kids', 'our group', 'slow service', 'cold food', 'awesome drinks', 'fun time', 'romantic atmosphere', 'dinner', 'lunch', 'breakfast', 'hot plate', 'smelled wonderful', 'no alcohol', 'bartender', 'wine list', 'outdoor seating', 'large room', 'no tips', 'valet parking', 'fine dining', 'dishes', 'shrimp', 'steak', 'chicken', 'beef', 'pasta', 'cake', 'pastries', 'creme brulee', 'simmering', 'coffee', 'fresh food', 'candlelit', 'anniversary', 'birthday', 'party', 'with friends', 'evening', 'stuffed', 'would go again', 'recommend this place', 'restrooms clean', 'host greeting', 'lovely place', 'best view', 'indoor seating', 'waited an hour', 'risotto', 'baked salmon', 'fried rice', 'shrimp scampi', 'sushi', 'wait time'];

const tags = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];

const jabber = new Jabber(buzzWords, 2);

const createReview = (resId) => {
  const review = {};
  review.restaurantId = resId;
  review.firstName = faker.name.firstName();
  review.lastName = faker.name.lastName();
  review.city = faker.address.city();
  review.numReviews = Math.floor(Math.random() * (25 - 1)) + 1;
  review.overall = Math.floor(Math.random() * (5 - 1)) + 1;
  review.food = Math.floor(Math.random() * (5 - 1)) + 1;
  review.service = Math.floor(Math.random() * (5 - 1)) + 1;
  review.ambience = Math.floor(Math.random() * (5 - 1)) + 1;
  review.dineDate = moment(faker.date.between('2019-01-01', '2020-01-24')).format('YYYY-MM-DD');
  // dineDate = faker.date.between('2019-01-01', '2020-01-24');
  review.noise = Math.floor(Math.random() * (5 - 1)) + 1;
  review.recommend = Math.random() < 0.7;
  review.comments = jabber.createParagraph(Math.floor(Math.random() * (50 - 10)) + 10);
  review.filterTag = tags[Math.floor(Math.random() * tags.length)];
  review.vip = Math.random() < 0.3;

  return review;
};

// const createReviews = () => {
//   // number of restaurants (will be 100)
//   const restaurantNum = 100;
//   const reviewsArray = [];
//   for (let i = 1; i <= restaurantNum; i += 1) {
//     // number of reviews per restaurant will be 30-90 , random here
//     const reviewCount = Math.floor(Math.random() * (90 - 30)) + 30;
//     for (let j = 0; j < reviewCount; j += 1) {
//       reviewsArray.push(createReview(i));
//     }
//   }
//   return reviewsArray;
// };

// async function insertDummyData() {
//   await Review.insertMany(createReviews());
// }

// insertDummyData()
//   .then(() => {
//     console.log('Database seeded');
//     process.exit();
//   });

module.exports = createReview;
