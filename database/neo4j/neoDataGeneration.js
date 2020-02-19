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
  const writeReviewers = fs.createWriteStream('/home/mrclean/HRR43/SDC/reviews/CSV/Reviewers.csv');
  let ok = true;

  writeReviewerToCSV();
  function writeReviewerToCSV() {
    do {
      let id = reviewerCount;
      let color = faker.random.arrayElement(circleColors);
      let vip = Math.random() < 0.3;
      let firstName = (Math.random() < 0.7) ? faker.name.firstName() : '';
      let lastName;
      if (firstName.length) {
        lastName = (Math.random() < 0.7) ? faker.name.lastName() : '';
      } else {
        lastName = '';
      }
      reviewerCount -= 1;

      if (reviewerCount === -1) {
        writeReviewers.end();
      } else {
        ok = writeReviewers.write(
          `${id},${color},${vip},${firstName},${lastName}\n`
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
  const writeReviews = fs.createWriteStream('/home/mrclean/HRR43/SDC/reviews/CSV/Reviews.csv');
  // writeReviews.write(`id, restaurantId, reviewerId, overall, food, service, ambience, dineDate, noise, recommend, filterTag, comments\n`)
  let reviewIndex = 1;

  let reviewOk = true;
  writeReviewToCSV();

  function writeReviewToCSV() {
    do {
      let id = reviewIndex;
      let overall = faker.random.number({min:1, max: 5});
      let food = faker.random.number({min:1, max: 5});
      let service = faker.random.number({min:1, max: 5});
      let ambience = faker.random.number({min:1, max: 5});
      let noise = faker.random.number({min:1, max: 5});
      let recommend = Math.random() < 0.7;
      let comments = jabber.createParagraph(faker.random.number({min:10, max: 20}));

      reviewIndex += 1;

      numberOfReviews -= 1;

      if (numberOfReviews === -1) {
        writeReviews.end();
      } else {
        reviewOk = writeReviews.write(`${id},${overall},${food},${service},${ambience},${noise},${recommend},${comments}\n`);
      }
      //
    } while (numberOfReviews >= 0 && reviewOk);

    if (numberOfReviews > 0) {
      writeReviews.once('drain', writeReviewToCSV);
    }
  }
  return numberOfReviews;
}

const createRestaurants = (numberOfRestaurants) => {
  const writeFile = fs.createWriteStream('/home/mrclean/HRR43/SDC/reviews/CSV/Restaurants.csv');

  let restaurantCount = numberOfRestaurants || 100;
  let ok = true;

  writeToCSV();
  function writeToCSV() {
    do {
      let city = faker.address.city();
      let restaurantId = restaurantCount;
      restaurantCount -= 1;

      if (restaurantCount === -1) {
        writeFile.end();
      } else {
        ok = writeFile.write(`${restaurantId},${city}\n`);
      }
    } while (restaurantCount >= 0 && ok);

    if (restaurantCount > 0) {
      writeFile.once('drain', writeToCSV);
    }
  }
};


createRelationshipsBetweenReviewsAndReviewer = (numberToGenerateRevRev) => {
  // :START_ID, date written, :END_ID, :TYPE
  // idOfReviewer, type-tag, idOfReview, WRITTEN_BY
  const writeReviewReviewerRelationships = fs.createWriteStream('/home/mrclean/HRR43/SDC/reviews/CSV/ReviewReviewerRelationships.csv');
  numberToGenerateRevRev += 1;

  writeReviewReviewerCSV();
  function writeReviewReviewerCSV() {
    do {
      let reviewerId =  Math.floor(Math.random() * 9999999) + 1;
      if (reviewerId === 0) reviewerId = 1;
      let dineDate = moment(faker.date.between('2019-01-01', '2020-01-24')).format('YYYY-MM-DD');
      numberToGenerateRevRev -= 1;

      if (numberToGenerateRevRev === 0) {
        writeReviewReviewerRelationships.end();
      } else {
        ok = writeReviewReviewerRelationships.write(`${reviewerId},${dineDate},${numberToGenerateRevRev},WROTE\n`);
      }
    } while (numberToGenerateRevRev > 0 && ok);

    if (numberToGenerateRevRev > 0) {
      writeReviewReviewerRelationships.once('drain', writeReviewReviewerCSV);
    }
  }
};


createRelationshipsBetweenReviewsAndRestaurant = (numberToGenerateRevRest) => {
  // :START_ID, type-tag, :END_ID, :TYPE
  // idOfReview, tag, idOfRestaurant, TAGGED_AS
  const writeReviewRestaurantRelationships = fs.createWriteStream('/home/mrclean/HRR43/SDC/reviews/CSV/ReviewRestaurantRelationships.csv');

  numberToGenerateRevRest += 1;

  writeReviewRestaurantCSV();
  function writeReviewRestaurantCSV() {
    do {
      let restaurantId = Math.floor(Math.random() * 9999999) + 1;
      let dineDate = moment(faker.date.between('2019-01-01', '2020-01-24')).format('YYYY-MM-DD');
      let filterTag = faker.random.arrayElement(tags);
      numberToGenerateRevRest -= 1;

      if (numberToGenerateRevRest === 0) {
        writeReviewRestaurantRelationships.end();
      } else {
        ok = writeReviewRestaurantRelationships.write(`${numberToGenerateRevRest},${filterTag},${restaurantId},TAGGED_AS\n`);
      }
    } while (numberToGenerateRevRest > 0 && ok);

    if (numberToGenerateRevRest > 0) {
      writeReviewRestaurantRelationships.once('drain', writeReviewRestaurantCSV);
    }
  }
};

createRelationshipsBetweenReviewsAndReviewer(100000000);
// createRelationshipsBetweenReviewsAndRestaurant(100000000);
// createReviews(100000000);
// createReviewers(10000000);
// createRestaurants(10000000);
