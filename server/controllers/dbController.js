const pg = require('pg');
require('dotenv').config();

const connectionString = "postgres://pjvvtmfk:zT5mz8u4CJK0HdMKj6qN69N0gKU2MSHZ@otto.db.elephantsql.com:5432/pjvvtmfk";
const pool = new pg.Pool({ connectionString });
let connectedClient;

// only connect once!
if (!connectedClient) {
  pool.connect((err, client) => {
    if (err) throw new Error(err);
    connectedClient = client;
  });
}

const dbController = {};

dbController.getDb = (req, res, next) => {
  console.log('getDB controller fired');
  res.locals.db = connectedClient;
  return next();
};

module.exports = dbController;
