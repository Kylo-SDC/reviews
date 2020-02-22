require('dotenv').config();
require('newrelic');

const express = require('express');

const app = express();
const port = process.env.REVIEWS_PORT || 3300;
// const db = require('../database/mongo');
// const db = require('../database/postgres');
const db = require('../database/neo4j');
var cors = require('cors');

app.use(express.static('./public'));

app.use('/781653508da1149f188dadf547aa46a7.png', express.static('./public/781653508da1149f188dadf547aa46a7.png'));

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log('Listening on port ', port);
});



app.get('/reviews/:restaurantId', (req, res) => {
  console.log(req.params);
  db.getRestaurantReviews(req.params)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error getting data from database ', err);
    });
});

app.get('/reviews/sort/:id/:sorting/:list', (req, res) => {
  const list = JSON.parse(req.params.list);
  db.getSortedRestaurantReviews({
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
  // newReview = {}
  db.addOneReview(newReview)
    .then((addedReview) => {
      res.status(201).json(addedReview);
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
