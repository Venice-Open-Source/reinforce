const setController = {};

setController.getSet = (req, res, next) => {
  const SQL = 'SELECT cardset_id, label, description FROM cardsets WHERE cardset_id = $1 AND user_id = $2';
  res.locals.db.query(SQL, [res.locals.setId, res.locals.userId])
    .then((data) => {
      const [set] = data.rows;
      res.locals.set = set;
      return next();
    })
    .catch((queryErr) => next(queryErr));
};

setController.createSet = (req, res, next) => {
  const SQL = 'INSERT INTO cardsets (label, description, user_id) VALUES ($1, $2, $3) RETURNING cardset_id';
  res.locals.db.query(SQL, [req.body.label, req.body.description, res.locals.userId])
    .then((data) => {
      const [set] = data.rows;
      const setId = set.cardset_id;
      res.locals.set = { setId };
      return next();
    })
    .catch((queryErr) => next(queryErr));
};

setController.updateSet = (req, res, next) => {
  const SQL = 'UPDATE cardsets set label = $1, description = $2 WHERE cardset_id = $3 AND user_id = $4';
  res.locals.db.query(SQL,
    [req.body.label, req.body.description, req.body.setId, res.locals.userId])
    .then(() => next())
    .catch((queryErr) => next(queryErr));
};

setController.deleteSet = (req, res, next) => {
  const SQL = 'DELETE FROM cardsets WHERE cardset_id = $1 AND user_id = $2';
  res.locals.db.query(SQL, [req.body.setId, res.locals.userId])
    .then(() => next())
    .catch((queryErr) => next(queryErr));
};

setController.getSets = (req, res, next) => {
  const SQL = 'SELECT cardset_id, label, description FROM cardsets WHERE user_id = $1';
  res.locals.db.query(SQL, [res.locals.userId])
    .then((data) => {
      const [set] = data.rows;
      res.locals.set = set;
      return next();
    })
    .catch((queryErr) => next(queryErr));
};

module.exports = setController;
