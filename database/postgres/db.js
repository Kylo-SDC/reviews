require('dotenv').config();
// const fs = require('fs');
const { Pool } = require('pg');
// const copyFrom = require('pg-copy-streams').from;

const connectionString = process.env.POSTGRES_CONNECTION_STRING;
// console.log(connectionString);

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;
