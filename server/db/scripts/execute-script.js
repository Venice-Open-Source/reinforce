require('dotenv').config();
const pg = require('pg');
const fs = require('fs');

const sql = fs.readFileSync((process.argv[2]), 'utf-8');
const connectionString = process.env.PG_CONNECTION;
const pool = new pg.Pool({
  connectionString,
});

pool.connect((err, client, done) => {
  if (err) {
    console.log('error: ', err);
    process.exit(1);
  }
  client.query(sql, (scriptErr) => {
    done();
    if (scriptErr) console.log(scriptErr);
  });
});

pool.end();
