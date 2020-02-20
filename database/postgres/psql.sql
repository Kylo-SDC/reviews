-- terminal command to ingest data: psql -f database/psql.sql mydb
-- generic: psql -f <file/to/ingest> <database_to_use>

DROP TABLE IF EXISTS reviewers;

CREATE TABLE reviewers (
  id  BIGINT PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  color TEXT NOT NULL,
  vip BOOLEAN NOT NULL
);

COPY reviewers(id, color, vip, firstName, lastName)
FROM '/home/mrclean/HRR43/SDC/reviews/CSV/Reviewers.csv' DELIMITER ',' CSV HEADER; --// removing for Neo4j may not add back


DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id BIGINT PRIMARY KEY,
  city TEXT NOT NULL
);

COPY restaurants (id, city)
FROM '/home/mrclean/HRR43/SDC/reviews/CSV/Restaurants.csv' DELIMITER ',' CSV HEADER; --  // removing for Neo4j, may not add back

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id BIGINT PRIMARY KEY,
  restaurantId BIGINT NOT NULL,
  reviewerId BIGINT NOT NULL,
  overall INT NOT NULL,
  food INT NOT NULL,
  service INT NOT NULL,
  ambience INT NOT NULL,
  dineDate DATE NOT NULL,
  noise INT NOT NULL,
  recommend BOOLEAN NOT NULL,
  filterTag TEXT,
  comments TEXT
);


COPY reviews (id, restaurantId, reviewerId, overall, food, service, ambience, dineDate, noise, recommend, filterTag, comments)
FROM '/home/mrclean/HRR43/SDC/reviews/CSV/Reviews.csv' DELIMITER ',' CSV HEADER; --  // removing for Neo4j, may not add back
