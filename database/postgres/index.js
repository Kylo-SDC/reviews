const pool = require('./db');

exports.getRestaurantReviews = ({ restaurantId }) => {
  return pool
  .connect()
  .then(client => {
    return client
      .query(
        `SELECT
          restaurants.id,
          restaurants.city,
          reviews.id,
          reviews.overall,
          reviews.food,
          reviews.service,
          reviews.ambience,
          reviews.dineDate,
          reviews.noise,
          reviews.recommend,
          reviews.filtertag,
          reviews.comments,
          reviews.id,
          reviewers.id,
          reviewers.firstname,
          reviewers.lastname,
          reviewers.color,
          reviewers.vip
        FROM
          restaurants,
          reviews,
          reviewers
        WHERE
          restaurants.id = $1
        AND
          reviews.restaurantid = $1
        And
          reviewers.id = reviews.reviewerid
        `, [restaurantId])
      .then(restaurantsAndReviews => {
        client.release();
        return restaurantsAndReviews.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
};

// may have to come back to this
exports.getSortedRestaurantReviews = ({sortField, sorting, restaurantId, list}) => {
  pool
  .connect()
  .then(client => {
    return client
      // same as above but sorted
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
};

exports.addOneReview =() => {
  pool
  .connect()
  .then(client => {
    return client
      // needs to return one review from the id
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
};

exports.getOneReview =() => {
  pool
  .connect()
  .then(client => {
    return client
      // needs to return one review from the id
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
};

exports.updateOneReview =() => {
  pool
  .connect()
  .then(client => {
    return client
      // needs to return one review from the id
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
};

exports.deleteOneReview =() => {
  pool
  .connect()
  .then(client => {
    return client
      // needs to return one review from the id
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
};
