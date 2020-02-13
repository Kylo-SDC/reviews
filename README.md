API Endpoints:

POST: /api/reviews
  - requires the following fields in the body:
      - {restaurantId, firstName, lastName, city, numReviews, overall, food, service, ambience
         dineDate, noise, recommend, comments, filterTag, vip, color}
  - returns a status 500 if not all fields are present or fields are of the incorrect type.
  - returns a status 201 if write is successful, along with the new review

GET: /api/reviews/:reviewId
  - reviewId is the id of the review that is being requested
  - returns a status 200 with 'null' if the review does not exist
  - returns a status 200 with the review if the id does exist

PUT: /api/reviews
  - requires the following fields in the body
    - the id of the review to be changed.
    - the correct field to be updated with the new value
  - returns status 200 and the updated review if successful
  - returns status 200 and 'null' if the review does not exist
  - returns status 500 and the error if the review being sent does not have the required fields

DELETE: /api/reviews/:reviewId
  - reviewId is the id of the review that is being requested
  - returns status 200 and the deleted review if successful
  - returns status 200 and 'null' if the review does not exist
