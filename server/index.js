const express = require('express');

const app = express();
const PORT = 3300;
const db = require('../database/mongo');
var cors = require('cors');

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});

app.get('/:restaurantId/', (req, res) => {
  db.getRestaurantReviews(req.params)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error getting data from database ', err);
    });
});

app.get('/sort/:id/:sorting/:list/', (req, res) => {
  const list = JSON.parse(req.params.list);
  let sortField = (req.params.sorting === 'Highest') ? '-overall' : 'overall';
  db.getSortedRestaurantReviews({
    sortField: sortField,
    sorting: req.params.sorting,
    restaurantId: req.params.id,
    list: list,
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error getting data from database ', err);
    });
});

app.post('/api/reviews', (req, res) => {
  const newReview = req.body;
  db.addOneReview(newReview)
    .then((addedReview) => {
      res.status(200).json(addedReview);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get('/api/reviews/:reviewId', (req, res) => {
  db.getOneReview(req.params.reviewId)
    .then((review) => {
      res.status(200).json(review);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.put('/api/reviews', (req, res) => {
  const updatedReviewData = req.body;
  const reviewId = req.body._id;
  delete updatedReviewData._id;

  db.updateOneReview(reviewId, updatedReviewData)
    .then((updatedReview) => {
      res.status(200).json(updatedReview);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.delete('/api/reviews/:reviewId', (req, res) => {
  db.deleteOneReview(req.params.reviewId)
    .then((deletedReview) => {
      res.status(200).json(deletedReview);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
