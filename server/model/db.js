require('dotenv').config();
const { Pool } = require('pg');

const URI = process.env.DB_URI;

const pool = new Pool({ connectionString: URI });

pool.query(`
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(40) NOT NULL,
    fk_sets INTEGER
  );
`)
.then(res => {
  console.log('Table Created if not exists.');
})
.catch(e => {
  console.log('Error during table creation: ', e);
});



module.exports = pool;
