require('dotenv').config();
// const fs = require('fs');
const {Pool, Client} = require('pg');
// const copyFrom = require('pg-copy-streams').from;

const connectionString = process.env.POSTGRES_CONNECTION_STRING;
console.log(connectionString);

const pool = new Pool({
  connectionString: connectionString,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

const client = new Client ({
  connectionString: connectionString,
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});

module.exports = {
  db: client,
}
