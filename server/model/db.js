require('dotenv').config();
const { Pool } = require('pg');

const URI = process.env.PG_CONNECTION;

const pool = new Pool({ connectionString: "postgres://pjvvtmfk:zT5mz8u4CJK0HdMKj6qN69N0gKU2MSHZ@otto.db.elephantsql.com:5432/pjvvtmfk" });

module.exports = pool;
