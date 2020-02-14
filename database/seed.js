const faker = require('faker/locale/en_US');
const Jabber = require('jabber');
const moment = require('moment');
const db = require('./mongo');

const buzzWords = ['great food', 'eat', 'service', 'drinks', 'loved', 'never again', 'dessert', 'main menu', 'appetizers', 'enjoyed', 'hated', 'server', 'noise', 'waitress', 'waiter', 'slow', 'fast', 'go again', 'clean', 'dirty', 'kids', 'our group', 'slow service', 'cold food', 'awesome drinks', 'fun time', 'romantic atmosphere', 'dinner', 'lunch', 'breakfast', 'hot plate', 'smelled wonderful', 'no alcohol', 'bartender', 'wine list', 'outdoor seating', 'large room', 'no tips', 'valet parking', 'fine dining', 'dishes', 'shrimp', 'steak', 'chicken', 'beef', 'pasta', 'cake', 'pastries', 'creme brulee', 'simmering', 'coffee', 'fresh food', 'candlelit', 'anniversary', 'birthday', 'party', 'with friends', 'evening', 'stuffed', 'would go again', 'recommend this place', 'restrooms clean', 'host greeting', 'lovely place', 'best view', 'indoor seating', 'waited an hour', 'risotto', 'baked salmon', 'fried rice', 'shrimp scampi', 'sushi', 'wait time'];

const tags = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];

const circleColors = ['#6c8ae4', '#d86441', '#bb6acd', '#df4e96'];

const jabber = new Jabber(buzzWords, 2);

const createReview = (reviewIdTracker) => {
  const review = {};

  // review
  review.id = reviewIdTracker;
  review.overall = faker.random.number({min:1, max: 5});
  review.food = faker.random.number({min:1, max: 5});
  review.service = faker.random.number({min:1, max: 5});
  review.ambience = faker.random.number({min:1, max: 5});
  review.dineDate = moment(faker.date.between('2019-01-01', '2020-01-24')).format('YYYY-MM-DD');
  review.noise = faker.random.number({min:1, max: 5});
  review.recommend = Math.random() < 0.7;
  review.comments = jabber.createParagraph(faker.random.number({min:10, max: 50}));
  review.filterTag = faker.random.arrayElement(tags);

  // person
  review.numReviews = faker.random.number({min:1, max:25});
  review.color = faker.random.arrayElement(circleColors);
  review.vip = Math.random() < 0.3;
  review.firstName = (Math.random() < 0.7) ? faker.name.firstName() : '';
  if (review.firstName.length) {
    review.lastName = (Math.random() < 0.7) ? faker.name.lastName() : '';
  } else {
    review.lastName = '';
  }

  return review;
};

const createRestaurants = (numberOfRestaurants, lastRestId, lastRevId) => {
  const restaurantCount = numberOfRestaurants || 100;
  let reviewIdTracker = lastRevId;
  const restaurantArray = [];

  for (let i = 1; i <= restaurantCount; i += 1) {
    let restaurant = {};
    restaurant.city = faker.address.city();
    restaurant.restaurantId = lastRestId + i;
    restaurant.reviews = [];

    console.log(restaurant.restaurantId);
    const reviewCount = faker.random.number({min:5, max: 10});

    for (let j = 0; j < reviewCount; j += 1) {
      reviewIdTracker += 1;
      restaurant.reviews.push(createReview(reviewIdTracker));
    }
    restaurantArray.push(restaurant);
  }

  return {restaurants: restaurantArray, lastRevId: reviewIdTracker};
};

// createRestaurants(10, 1000, 1500)

// returns {restaurants: {rest.city, rest.id, rest.reviews: [all specific review data]}, lastRevId: lastId used}
module.exports.createRestaurants = createRestaurants;
