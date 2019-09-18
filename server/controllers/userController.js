const userController = {};

userController.dummyUser = (req, res, next) => {
  res.locals.userId = 100;
  return next();
};

userController.getUser = (req, res, next) => {
  const SQL = 'SELECT user_id, email FROM users WHERE user_id = $1';
  res.locals.db.query(SQL, [res.locals.userId])
    .then((data) => {
      const [user] = data.rows;
      res.locals.user = user;
      return next();
    })
    .catch((queryErr) => next(queryErr));
};

userController.createUser = (req, res, next) => {
  const SQL = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id';
  res.locals.db.query(SQL, [req.body.email, req.body.password])
    .then((data) => {
      const [user] = data.rows;
      const userId = user.user_id;
      res.locals.user = { userId };
      return next();
    })
    .catch((queryErr) => next(queryErr));
};

userController.updateUser = (req, res, next) => {
  const SQL = 'UPDATE users set email = $1, password = $2 WHERE user_id = $3';
  res.locals.db.query(SQL, [req.body.email, req.body.password, res.locals.userId])
    .then(() => next())
    .catch((queryErr) => next(queryErr));
};

userController.deleteUser = (req, res, next) => {
  const SQL = 'DELETE FROM users WHERE user_id = $1';
  res.locals.db.query(SQL, [res.locals.userId])
    .then(() => next())
    .catch((queryErr) => next(queryErr));
};

module.exports = userController;
