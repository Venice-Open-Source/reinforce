const uuidv4 = require('uuid/v4');
const db = require('../model/db');

const authControllers = {};

// should call loginUser after creating user in the route handler to take user to account
authControllers.createUser = (req, res, next) => {
  const { email, password } = req.body;
  const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
  const values = [email, password];
  db.query(query, values)
    .then((resp) => {
      console.log(resp);
      next();
    })
    .catch((err) => {
      next({ log: err });
    });
};

// relies on database responding with an error to handle incorrect username password combinations
authControllers.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = 'SELECT email AND password FROM users WHERE username=$1 AND password=$2 RETURNING *';
  const values = [username, password];
  db.query(query, values)
    .then((resp) => {
    // if the database responds with username & password, the username and password exist
    // store ssid into database
      const ssid = uuidv4();
      const query = 'INSERT INTO sessions (username, ssid) VALUES ($1, $2) RETURNING *';
      const values = [username, ssid];
      db.query(query, values)
        .then((resp) => {
          res.cookie('ssid', ssid);

          return next();
        })
        .catch((err) => {
          console.log('error storing ssid in sessions table', 'error message', err);
          res.status(403).send('Internal Server Error');
        });
    })
    .catch((err) => {
      res.status(403).send('Not Authorized');
    });
};

// relies on server responding with an error if the ssid doesn't exist
authControllers.checkCookie = (req, res, next) => {
  // check req.cookies.ssid against the database
  const { ssid } = req.body.cookies;
  const query = 'SELECT ssid FROM sessions WHERE ssid=$1 RETURNING *';
  const values = [ssid];
  db.query(query, values)
    .then((resp) => {
      console.log(resp);
      next();
    })
    .catch((err) => {
      next({ log: err });
    });
};

module.exports = authControllers;
