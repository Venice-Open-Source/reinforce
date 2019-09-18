const uuidv4 = require('uuid/v4');
const db = require('../model/db');

const authControllers = {};

// should call setCookie after creating user as the next piece of middleware in the chain
authControllers.createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (email.length !== undefined && password !== undefined) {
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const values = [email, password];
    db.query(query, values)
      .then((resp) => {
      // console.log('response in createUser:', resp);
        res.locals.email = resp.rows[0].email;
        res.locals.password = resp.rows[0].password;
        res.locals.userId = resp.rows[0].user_id;
        next();
      })
      .catch((err) => {
        next({ log: err });
      });
  } else {
    res.send('Your attempt to create a user account was unsuccessful.  Please refresh and try again');
  }
};

// should call setCookie after logging in a user as the next piece of middleware in the chain
authControllers.login = (req, res, next) => {
  const { email, password } = req.body;
  if (email !== undefined && password !== undefined) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const values = [email];
    db.query(query, values)
      .then((resp) => {
        // console.log('response in user login authentication:', resp);
        if (password === resp.rows[0].password) {
          res.locals.userId = resp.rows[0].user_id;
          res.locals.email = resp.rows[0].email;
          next();
        }
      })
      .catch((err) => {
        next({ log: err });
      });
  } else {
    res.send('There was a problem with your login information.  Please refresh the page and login again');
  }
};

authControllers.setCookie = (req, res, next) => {
  const ssid = uuidv4();
  const { email } = res.locals;
  const query = 'INSERT INTO sessions (email, ssid) VALUES ($1, $2) RETURNING *';
  const values = [email, ssid];
  db.query(query, values)
    .then((resp) => {
      // console.log('response in set cookie:', resp);
      res.cookie('ssid', ssid);
      return next();
    })
    .catch((err) => {
      next({ log: err });
    });
};

authControllers.checkCookie = (req, res, next) => {
  const { ssid } = req.cookies;
  // check to see if there is a valid cookie
  if (ssid !== undefined) {
    const query = 'SELECT * FROM sessions WHERE ssid=$1';
    const values = [ssid];
    db.query(query, values)
      .then((resp) => {
        // console.log('response in checkCookie:', resp);
        // check to see if cookie is in database
        if (resp.rows[0].ssid === ssid) {
        // query database for user id
          const { email } = resp.rows[0];
          const getUserId = 'SELECT * FROM users WHERE email=$1';
          const queryValue = [email];
          db.query(getUserId, queryValue)
            .then((userTableResponse) => {
              // console.log('response in checkCookie user table', userTableResponse);
              res.locals.userId = userTableResponse.rows[0].user_id;
            })
            .catch((err) => {
              next({ log: err });
            });
          next();
        } else {
          res.redirect('/');
        }
      })
      .catch((err) => {
        next({ log: err });
      });
  } else {
    res.redirect('/');
  }
};

module.exports = authControllers;
