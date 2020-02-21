const neo4j = require('neo4j-driver');
require('dotenv').config();

const driver = neo4j.driver(
  process.env.NEO_URL,
  neo4j.auth.basic(process.env.NEO_USER, process.env.NEO_PW),
);

module.exports = driver.session();
