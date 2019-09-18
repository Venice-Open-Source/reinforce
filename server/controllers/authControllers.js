const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const db = require('../model/db');

const Salt_Work_Factor = 10;

const authControllers = {};

// should call setCookie after creating user as the next piece of middleware in the chain
authControllers.createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (email !== undefined && password !== undefined) {
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const salt = bcrypt.genSaltSync(Salt_Work_Factor);
    const hashedPass = bcrypt.hashSync(password, salt);
    const values = [email, hashedPass];
    db.query(query, values)
      .then((resp) => {
        res.locals.email = resp.rows[0].email;
        res.locals.password = resp.rows[0].password;
        res.locals.userId = resp.rows[0].user_id;
        next();
      })
      .catch((err) => {
        if (err.code === '23505') {
          res.send('User already exists.  Please choose another email.');
        }
        next({ log: err });
      });
  } else {
    res.send('Your attempt to create a user account was unsuccessful.  Please refresh and try again.');
  }
};

// should call setCookie after logging in a user as the next piece of middleware in the chain
authControllers.login = (req, res, next) => {
  console.log('req.body inside login middleware:', req.body);
  const { email, password } = req.body;
  if (email !== undefined && password !== undefined) {
    console.log('user exists! login successful');
    const query = 'SELECT * FROM users WHERE email=$1';
    const values = [email];
    db.query(query, values)
      .then((resp) => {
        console.log('resp inside login dbquery:', resp);
        // email or does not exist in the database
        if (resp.rows.length === 0) {
          // redirect to login screen
          // return res.redirect('/');
          return res.send('user not exist');
        }
        bcrypt.compare(password, resp.rows[0].password, (err, data) => {
          if (data) {
            res.locals.userId = resp.rows[0].user_id;
            res.locals.email = resp.rows[0].email;
            return next();
          } else {
            return next({ log: 'incorrect password', message: 'Incorrect password.  Please refresh and enter your password again' });
          }
        });
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
        // check to see if cookie is in database
        if (resp.rows[0].ssid === ssid) {
          // query database for user id
          const { email } = resp.rows[0];
          const getUserId = 'SELECT * FROM users WHERE email=$1';
          const queryValue = [email];
          db.query(getUserId, queryValue)
            .then((userTableResponse) => {
              res.locals.userId = userTableResponse.rows[0].user_id;
              return next();
            })
            .catch((err) => {
              next({ log: err });
            });
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
