const createReview = require('./seedFunction');

test('checks that review values for ratings are from 1 to 5', () => {
  const review = createReview(1);
  expect(review.overall).toBeGreaterThanOrEqual(1);
  expect(review.overall).toBeLessThanOrEqual(5);
  expect(review.food).toBeGreaterThanOrEqual(1);
  expect(review.food).toBeLessThanOrEqual(5);
  expect(review.service).toBeGreaterThanOrEqual(1);
  expect(review.service).toBeLessThanOrEqual(5);
  expect(review.ambience).toBeGreaterThanOrEqual(1);
  expect(review.ambience).toBeLessThanOrEqual(5);
  expect(review.noise).toBeGreaterThanOrEqual(1);
  expect(review.noise).toBeLessThanOrEqual(5);
});
