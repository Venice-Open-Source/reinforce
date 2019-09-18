const pg = require('pg');
require('dotenv').config();

const connectionString = process.env.PG_CONNECTION;
const pool = new pg.Pool({ connectionString });
let connectedClient;

pool.connect((err, client) => {
  if (err) return ({ err });
  connectedClient = client;
});

const dbController = {};

dbController.getDb = (req, res, next) => {
  res.locals.db = connectedClient;
  next();
};

module.exports = dbController;
