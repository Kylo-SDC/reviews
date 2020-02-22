import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 110,
  duration: "5m",
  rps: 1100
};

/////////////////////// uncomment to run POST request tests ///////////////////////
// export default function() {
//   let randomURL = Math.floor(Math.random() * 1000000);
//   let randomReview = Math.floor(Math.random() * 1000) + 100000100;
//   let req = {
//     method: 'GET',
//     url: `http://localhost:3300/${randomURL}`,
//     tags: {name: 'GET RestaurantId'},
//   };

//   let tagOptions = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];
//   let tag = tagOptions[Math.round(Math.random() * 4)];

//   let reviewerOptions = ['10000002', '10000003', '10000004', '10000005', '10000006', '10000007'];
//   let reviewer = reviewerOptions[Math.round(Math.random() * 5)];

//   let post = {
//     method: `POST`,
//     url: `http://localhost:3300/api/reviews`,
//     body: JSON.stringify(
//       {
//         restaurantId: 10000002,
//         reviewerId: reviewer,
//         comments: 'ThIs WaS a GrEaT pLaCe',
//         ambiance: 5,
//         service: 5,
//         noise: 5,
//         overall: 5,
//         recomment: true,
//         food: 5,
//         date: '2019-02-21',
//         tag: tag,
//         reviewId: randomReview,
//       }
//     ),
//     params: { headers: { "Content-Type": "application/json" } }
//   }

//   let responses = http.batch( [req, post]);

//   check(responses[0], {
//     "status was 200": (r) => r.status == 200,
//     "transaction time OK": (r) => r.timings.duration < 2000
//   });
//   check(responses[1], {
//     "status was 201": (r) => r.status == 201,
//     "transaction time OK": (r) => r.timings.duration < 2000
//   });
// };

///////////////// uncomment to run GET Tests //////////////////////////////
// export default function() {
//     let randomId = Math.floor(Math.random() * 1000000);

//     let req1 = {
//       method: 'GET',
//       url: `http://localhost:3300/${randomId}`,
//       tags: {name: 'GET RestaurantId'},
//     };

//     let sortOptions = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];
//     let sortBy = JSON.stringify([sortOptions[Math.round(Math.random() * 4)]]);

//     let req2 = {
//       method: `GET`,
//       url: `http://localhost:3300/sort/${randomId}/0/${sortBy}`,
//       tags: {name: 'GET sortedReviews'},
//     };

//     let responses = http.batch( [req1, req2]);

//     check(responses[0], {
//       "status was 200": (r) => r.status == 200,
//       "transaction time OK": (r) => r.timings.duration < 2000
//     });
//     check(responses[1], {
//       "status was 200": (r) => r.status == 200,
//       "transaction time OK": (r) => r.timings.duration < 2000
//     });
// };