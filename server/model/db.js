require('dotenv').config();
const { Pool } = require('pg');

const URI = process.env.PG_CONNECTION;

const pool = new Pool({ connectionString: process.env.PG_CONNECTION });

module.exports = pool;
