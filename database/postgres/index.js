const pool = require('./db');

exports.getRestaurantReviews = (restaurantId) => {
  pool
  .connect()
  .then(client => {
    return client
      // same as what was being sent to db before
      .query('SELECT  FROM users WHERE id = $1', [1])
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

exports.getSortedRestaurantReviews = () => {
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
