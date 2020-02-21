const { driver } = require('./db');



module.exports.getRestaurantReviews = ({ restaurantId }) => {
  const session = driver.session();
  // let restString = restaurantId.toString();
  // console.log(restaurantId);
  return session
    .run(`MATCH (rest:Restaurant)<-[r]-(rev:Review)<-[r2]-(reviewer:Reviewer)
          WHERE rest.restaurantId = $restaurantId
          MATCH (reviewer)-->(revCount:Review)
          RETURN
            count(revCount) AS numReviews,
            rest.restaurantId AS restaurantId,
            rest.city AS city,
            r.tag AS filterTag,
            rev.reviewId AS reviewId,
            rev.ambience AS ambience,
            rev.comments AS comments,
            rev.food AS food,
            rev.noise AS noise,
            rev.overall AS overall,
            rev.recommend AS recommend,
            rev.service AS service,
            r2.date AS dineDate,
            reviewer.reviewerId AS reviewerId,
            reviewer.color AS color,
            reviewer.firstName AS firstName,
            reviewer.lastName AS lastName,
            reviewer.vip AS vip
          ORDER BY dineDate DESC`,
            // will need subquery for number of reviews in db
          {restaurantId: restaurantId.toString()})
    .then((reviews) => {
      session.close();
      let reviewsArr = [];

      for (let i = 0; i < reviews.records.length; i++) {
        let review = {};

        for (let [key, val] of Object.entries(reviews.records[i]._fieldLookup)) {
          if (reviews.records[i]._fields[val] !== null && typeof reviews.records[i]._fields[val] === 'object' ) {
            review[key] = reviews.records[i]._fields[val].low;
          } else {
            review[key] = reviews.records[i]._fields[val];
          }
        }
        if (!review.firstName) review.firstName = '';
        if (!review.lastName) review.lastName = '';
        reviewsArr.push(review);
      }
      return reviewsArr;
    })
    .catch((error) => {
      console.log(error);
    })
};

module.exports.getSortedRestaurantReviews = ({ restaurantId, list, sorting }) => {
  const session = driver.session();
  let tags ;
  let sortBy;
  list.length ? tags = list : tags = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];

  if (sorting === 'Highest') {
    return db
      .run(
        `MATCH (rest:Restaurant)<-[r]-(rev:Review)<-[r2]-(reviewer:Reviewer)
        WHERE rest.restaurantId = $restaurantId AND r.tag IN $tags
        MATCH (reviewer)-->(revCount:Review)
        RETURN
          count(revCount) AS numReviews,
          rest.restaurantId AS restaurantId,
          rest.city AS city,
          r.tag AS filterTag,
          rev.reviewId AS reviewId,
          rev.ambience AS ambience,
          rev.comments AS comments,
          rev.food AS food,
          rev.noise AS noise,
          rev.overall AS overall,
          rev.recommend AS recommend,
          rev.service AS service,
          r2.date AS dineDate,
          reviewer.reviewerId AS reviewerId,
          reviewer.color AS color,
          reviewer.firstName AS firstName,
          reviewer.lastName AS lastName,
          reviewer.vip AS vip
        ORDER BY overall DESC`,
        {restaurantId: restaurantId.toString(), tags: tags})
      .then((reviews) => {
        session.close();
        let reviewsArr = [];
        // console.log(reviews);
        // reviews.records.forEach(r => console.log(r._fields[9]));
        for (let i = 0; i < reviews.records.length; i++) {
          let review = {};

          for (let [key, val] of Object.entries(reviews.records[i]._fieldLookup)) {
            if (reviews.records[i]._fields[val] !== null && typeof reviews.records[i]._fields[val] === 'object' ) {
              review[key] = reviews.records[i]._fields[val].low;
            } else {
              review[key] = reviews.records[i]._fields[val];
            }
          }
          if (!review.firstName) review.firstName = '';
          if (!review.lastName) review.lastName = '';
          reviewsArr.push(review);
        }
        // console.log(reviewsArr);
        return reviewsArr;
      })
      .catch((error) => {
        console.log(error);
      })
  } else if (sorting === 'Lowest') {
    sortBy = `rev.overall`;
    return db
      .run(
        `MATCH (rest:Restaurant)<-[r]-(rev:Review)<-[r2]-(reviewer:Reviewer)
        WHERE rest.restaurantId = $restaurantId AND r.tag IN $tags
        MATCH (reviewer)-->(revCount:Review)
        RETURN
          count(revCount) AS numReviews,
          rest.restaurantId AS restaurantId,
          rest.city AS city,
          r.tag AS filterTag,
          rev.reviewId AS reviewId,
          rev.ambience AS ambience,
          rev.comments AS comments,
          rev.food AS food,
          rev.noise AS noise,
          rev.overall AS overall,
          rev.recommend AS recommend,
          rev.service AS service,
          r2.date AS dineDate,
          reviewer.reviewerId AS reviewerId,
          reviewer.color AS color,
          reviewer.firstName AS firstName,
          reviewer.lastName AS lastName,
          reviewer.vip AS vip
        ORDER BY overall`,
        { restaurantId: restaurantId.toString(), tags: tags})
      .then((reviews) => {
        session.close();
        let reviewsArr = [];
        // console.log(reviews);
        // reviews.records.forEach(r => console.log(r._fields[9]));
        for (let i = 0; i < reviews.records.length; i++) {
          let review = {};

          for (let [key, val] of Object.entries(reviews.records[i]._fieldLookup)) {
            if (reviews.records[i]._fields[val] !== null && typeof reviews.records[i]._fields[val] === 'object' ) {
              review[key] = reviews.records[i]._fields[val].low;
            } else {
              review[key] = reviews.records[i]._fields[val];
            }
          }
          if (!review.firstName) review.firstName = '';
          if (!review.lastName) review.lastName = '';
          reviewsArr.push(review);
        }
        // console.log(reviewsArr);
        return reviewsArr;
      })
      .catch((error) => {
        console.log(error);
      })
  } else {
    return db
      .run(
        `MATCH (rest:Restaurant)<-[r]-(rev:Review)<-[r2]-(reviewer:Reviewer)
        WHERE rest.restaurantId = $restaurantId AND r.tag IN $tags
        MATCH (reviewer)-->(revCount:Review)
        RETURN
          count(revCount) AS numReviews,
          rest.restaurantId AS restaurantId,
          rest.city AS city,
          r.tag AS filterTag,
          rev.reviewId AS reviewId,
          rev.ambience AS ambience,
          rev.comments AS comments,
          rev.food AS food,
          rev.noise AS noise,
          rev.overall AS overall,
          rev.recommend AS recommend,
          rev.service AS service,
          r2.date AS dineDate,
          reviewer.reviewerId AS reviewerId,
          reviewer.color AS color,
          reviewer.firstName AS firstName,
          reviewer.lastName AS lastName,
          reviewer.vip AS vip
        ORDER BY dineDate DESC`,
        { restaurantId: restaurantId.toString(), tags: tags})
      .then((reviews) => {
        session.close();
        let reviewsArr = [];
        // console.log(reviews);
        // reviews.records.forEach(r => console.log(r._fields[9]));
        for (let i = 0; i < reviews.records.length; i++) {
          let review = {};

          for (let [key, val] of Object.entries(reviews.records[i]._fieldLookup)) {
            if (reviews.records[i]._fields[val] !== null && typeof reviews.records[i]._fields[val] === 'object' ) {
              review[key] = reviews.records[i]._fields[val].low;
            } else {
              review[key] = reviews.records[i]._fields[val];
            }
          }
          if (!review.firstName) review.firstName = '';
          if (!review.lastName) review.lastName = '';
          reviewsArr.push(review);
        }
        // console.log(reviewsArr);
        return reviewsArr;
      })
      .catch((error) => {
        console.log(error);
      })
  }
};
