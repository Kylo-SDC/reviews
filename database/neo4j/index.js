const db = require('./db');

module.exports.getRestaurantReviews = ({ restaurantId }) => {
  // console.log(db);
  return db
  .run('MATCH (rest:Restaurant)<-[r]-(rev:Review)<-[r2]-(reviewer:Reviewer) WHERE rest.restaurantId = "9999999" RETURN rest, r, rev, r2, reviewer')
  .then((reviews) => {
    console.log(reviews)
    db.close(() => {
      console.log('Person created, session closed')
    });
    return reviews;
  })
  .catch((error) => {
    console.log(error);
  })
}