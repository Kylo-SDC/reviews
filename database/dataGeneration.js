const faker = require('faker/locale/en_US');
const Jabber = require('jabber');
const moment = require('moment');
const fs = require('fs');

const buzzWords = ['great food', 'eat', 'service', 'drinks', 'loved', 'never again', 'dessert', 'main menu', 'appetizers', 'enjoyed', 'hated', 'server', 'noise', 'waitress', 'waiter', 'slow', 'fast', 'go again', 'clean', 'dirty', 'kids', 'our group', 'slow service', 'cold food', 'awesome drinks', 'fun time', 'romantic atmosphere', 'dinner', 'lunch', 'breakfast', 'hot plate', 'smelled wonderful', 'no alcohol', 'bartender', 'wine list', 'outdoor seating', 'large room', 'no tips', 'valet parking', 'fine dining', 'dishes', 'shrimp', 'steak', 'chicken', 'beef', 'pasta', 'cake', 'pastries', 'creme brulee', 'simmering', 'coffee', 'fresh food', 'candlelit', 'anniversary', 'birthday', 'party', 'with friends', 'evening', 'stuffed', 'would go again', 'recommend this place', 'restrooms clean', 'host greeting', 'lovely place', 'best view', 'indoor seating', 'waited an hour', 'risotto', 'baked salmon', 'fried rice', 'shrimp scampi', 'sushi', 'wait time'];

const tags = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];

const circleColors = ['#6c8ae4', '#d86441', '#bb6acd', '#df4e96'];

const jabber = new Jabber(buzzWords, 2);

const allWritesFinished = [false, false];



function createReviewers(NumberOfPeople) {
  let reviewerCount = NumberOfPeople || 100;
  // const writeReviews = fs.createWriteStream('/media/mrclean/WD Black 2TB/CSV/Reviews.csv');
  const writeReviewers = fs.createWriteStream('/media/mrclean/WD Black 2TB/CSV/Reviewers.csv');
  let ok = true;


  writeReviewers.write('id, color, vip, reviewCount, firstName, lastName \n');


  writeReviewerToCSV();
  function writeReviewerToCSV() {
    do {
      let reviewer = {};
      reviewer.id = reviewerCount;
      reviewer.reviewCount = faker.random.number({min: 1, max: 15})
      reviewer.color = faker.random.arrayElement(circleColors);
      reviewer.vip = Math.random() < 0.3;
      reviewer.firstName = (Math.random() < 0.7) ? faker.name.firstName() : '';
      if (reviewer.firstName.length) {
        reviewer.lastName = (Math.random() < 0.7) ? faker.name.lastName() : '';
      } else {
        reviewer.lastName = '';
      }
      reviewerCount -= 1;

      ///////////////////////////////////////////

      // await writeReview(reviewer.id, reviewer.reviewCount, writeReviews);

      if (reviewerCount === -1) {
        writeReviewers.end();
      } else {
        ok = writeReviewers.write(
          `${reviewer.id}, ${reviewer.color}, ${reviewer.vip}, ${reviewer.reviewCount}, ${reviewer.firstName}, ${reviewer.lastName} \n`
        );
      }
    } while (reviewerCount >= 0 && ok);

    if (reviewerCount > 0) {
      writeReviewers.once('drain', writeReviewerToCSV);
    }
  }
};


// re-write to be independent and select random users && random restaurants
function createReviews(numberOfReviews){
  const writeReviews = fs.createWriteStream('/media/mrclean/WD Black 2TB/CSV/Reviews.csv');
  writeReviews.write(`id, restaurantId, reviewerId, overall, food, service, ambience, dineDate, noise, recommend, filterTag, comments \n`)
  let reviewIndex = 0;

  let reviewOk = true;
  writeReviewToCSV();

  function writeReviewToCSV() {

    do {
      let review ={};
      review.restaurantId = Math.floor(Math.random() * 10000000);
      review.reviewerId =  Math.floor(Math.random() * 10000000);
      review.id = reviewIndex;
      review.overall = faker.random.number({min:1, max: 5});
      review.food = faker.random.number({min:1, max: 5});
      review.service = faker.random.number({min:1, max: 5});
      review.ambience = faker.random.number({min:1, max: 5});
      review.dineDate = moment(faker.date.between('2019-01-01', '2020-01-24')).format('YYYY-MM-DD');
      review.noise = faker.random.number({min:1, max: 5});
      review.recommend = Math.random() < 0.7;
      review.comments = jabber.createParagraph(faker.random.number({min:10, max: 50}));
      review.filterTag = faker.random.arrayElement(tags);
      reviewIndex += 1;

      numberOfReviews -= 1;

      if (numberOfReviews === -1) {
        writeReviews.end();
      } else {
        reviewOk = writeReviews.write(`${review.id}, ${review.restaurantId}, ${review.reviewerId}, ${review.overall}, ${review.food}, ${review.service}, ${review.ambience}, ${review.dineDate}, ${review.noise}, ${review.recommend}, ${review.filterTag}, ${review.comments} \n`);
      }

    } while (numberOfReviews >= 0 && reviewOk);

    if (numberOfReviews > 0) {
      writeReviews.once('drain', writeReviewToCSV);
    }
  }
  return numberOfReviews;
}




const createRestaurants = (numberOfRestaurants) => {
  const writeFile = fs.createWriteStream('/media/mrclean/WD Black 2TB/CSV/Restaurants.csv');

  let restaurantCount = numberOfRestaurants || 100;
  let ok = true;

  writeFile.write(`id, city \n`)

  writeToCSV();
  function writeToCSV() {
    do {
      let restaurant = {};
      restaurant.city = faker.address.city();
      restaurant.restaurantId = restaurantCount;
      restaurantCount -= 1;

      if (restaurantCount === -1) {
        writeFile.end();
      } else {
        ok = writeFile.write(`${restaurant.restaurantId}, ${restaurant.city} \n`);
      }

    } while (restaurantCount >= 0 && ok);

    if (restaurantCount > 0) {
      writeFile.once('drain', writeToCSV);
    }
  }
};

createReviews(150000000);
createReviewers(10000000);
createRestaurants(10000000);
