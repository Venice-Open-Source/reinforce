const pg = require('pg');
require('dotenv').config();

const connectionString = process.env.PG_CONNECTION;
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
  res.locals.db = connectedClient;
  next();
};

module.exports = dbController;
