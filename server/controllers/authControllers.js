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

// should call set cookie as the next piece of middleware in the chain
authControllers.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  const query = 'SELECT email AND password FROM users WHERE email=$1 AND password=$2 RETURNING *';
  const values = [email, password];
  db.query(query, values)
    .then((resp) => {
      console.log(resp);
      if (resp.rows[0]) {
        next();
      }
    })
    .catch((err) => {
      next({ log: err });
    });
};

authControllers.setCookie = (req, res, next) => {
  const ssid = uuidv4();
  const { email } = req.body;
  const query = 'INSERT INTO sessions (email, ssid) VALUES ($1, $2) RETURNING *';
  const values = [email, ssid];
  db.query(query, values)
    .then((resp) => {
      console.log(resp);
      res.cookie('ssid', ssid);
      return next();
    })
    .catch((err) => {
      next({ log: err });
    });
};

authControllers.checkCookie = (req, res, next) => {
  // check req.cookies.ssid against the database
  const { ssid } = req.body.cookie;
  const query = 'SELECT ssid FROM sessions WHERE ssid=$1 RETURNING *';
  const values = [ssid];
  db.query(query, values)
    .then((resp) => {
      console.log(resp);
      if (resp.rows[0] === ssid) {
        res.locals.uer = resp.rows[0];
        next();
      }
    })
    .catch((err) => {
      next({ log: err });
    });
};

module.exports = authControllers;
