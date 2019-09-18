const cardController = {};

cardController.getCard = (req, res, next) => {
  const SQL = `SELECT card_id, question, answer
                FROM cards c 
                INNER JOIN cardsets s 
                ON s.cardset_id = c.cardset_id 
                WHERE c.card_id = $1 AND s.user_id = $2`;

  res.locals.db.query(SQL, [req.body.cardId, res.locals.userId])
    .then((data) => {
      const [card] = data.rows;
      res.locals.set = card;
      return next();
    })
    .catch((queryErr) => next({ log: queryErr }));
};

cardController.createCard = (req, res, next) => {
  const validationSQL = `SELECT cardset_id 
                FROM cardsets 
                WHERE cardset_id = $1
                AND user_id = $2`;
  res.locals.db.query(validationSQL, [req.body.setId, res.locals.userId])
    .then((data) => {
      const [validationResult] = data.rows;
      const setId = validationResult.cardset_id;
      if (!setId) return ({ err: `attempt to create a card in a set not owned by user ${res.locals.userId}` });
      const insertSQL = 'INSERT INTO cards (question, answer, cardset_id) VALUES ($1, $2, $3) RETURNING card_id';
      res.locals.db.query(insertSQL, [req.body.question, req.body.answer, req.body.setId])
        .then((newCardData) => {
          const [card] = newCardData.rows;
          const cardId = card.card_id;
          res.locals.card = { cardId };
          return next();
        })
        .catch((queryErr) => next({ log: queryErr }));
    })
    .catch((queryErr) => next({ log: queryErr }));
};

cardController.updateCard = (req, res, next) => {
  const validationSQL = `SELECT cardset_id 
                FROM cardsets 
                WHERE cardset_id = $1
                AND user_id = $2`;
  res.locals.db.query(validationSQL, [req.body.setId, res.locals.userId])
    .then((data) => {
      const [validationResult] = data.rows;
      const setId = validationResult.cardset_id;
      if (!setId) next({ log: `attempt to update a card in a set not owned by user ${res.locals.userId}` });
      const updateSQL = `UPDATE cards 
                          SET question = $1, answer = $2, cardset_id = $3
                          WHERE card_id = $4`;
      res.locals.db.query(updateSQL,
        [req.body.question, req.body.answer, req.body.setId, req.body.cardId])
        .then(() => next())
        .catch((queryErr) => next({ log: queryErr }));
    })
    .catch((queryErr) => next({ log: queryErr }));
};

cardController.deleteCard = (req, res, next) => {
  const validationSQL = `SELECT cardset_id 
                FROM cardsets 
                WHERE cardset_id = $1
                AND user_id = $2`;
  res.locals.db.query(validationSQL, [req.body.setId, res.locals.userId])
    .then((data) => {
      const [validationResult] = data.rows;
      const setId = validationResult.cardset_id;
      if (!setId) return next({ log: `attempt to delete a card in a set not owned by user ${res.locals.userId}` });
      const deleteSQL = `DELETE FROM cards 
                          WHERE card_id = $1 AND cardset_id = $2`;
      res.locals.db.query(deleteSQL,
        [req.body.cardId, req.body.setId])
        .then(() => next())
        .catch((queryErr) => next({ log: queryErr }));
    })
    .catch((queryErr) => next({ log: queryErr }));
};

cardController.deleteCardsForSet = (req, res, next) => {
  const validationSQL = `SELECT cardset_id 
                FROM cardsets 
                WHERE cardset_id = $1
                AND user_id = $2`;
  res.locals.db.query(validationSQL, [req.body.setId, res.locals.userId])
    .then((data) => {
      const [validationResult] = data.rows;
      const setId = validationResult.cardset_id;
      if (!setId) return next({ log: `attempt to delete a card in a set not owned by user ${res.locals.userId}` });
      const deleteSQL = `DELETE FROM cards 
                          WHERE cardset_id = $1`;
      res.locals.db.query(deleteSQL,
        [req.body.setId])
        .then(() => next())
        .catch((queryErr) => next({ log: queryErr }));
    })
    .catch((queryErr) => next({ log: queryErr }));
};

cardController.getCardsForSet = (req, res, next) => {
  const SQL = `SELECT card_id, question, answer
                FROM cards c 
                INNER JOIN cardsets s 
                ON s.cardset_id = c.cardset_id 
                WHERE s.cardset_id = $1 AND s.user_id = $2`;

  res.locals.db.query(SQL, [req.params.setid, res.locals.userId])
    .then((data) => {
      res.locals.set = data.rows;
      return next();
    })
    .catch((queryErr) => next({ log: queryErr }));
};

cardController.getCardsForEverySet = async (req, res, next) => {
  const results = {};

  const userDataSQL = 'SELECT email FROM users WHERE user_id = $1';
  const setDataSQL = 'SELECT label, cardset_id FROM cardsets WHERE user_id = $1';
  const cardDataSQL = 'SELECT question, answer FROM cards WHERE cardset_id = $1';

  const data = await res.locals.db.query(userDataSQL, [res.locals.userId]).catch((e) => next({ log: e }));
  const [user] = data.rows;
  results.userEmail = user.email;
  results.sets = [];
  const sets = await res.locals.db.query(setDataSQL, [res.locals.userId]);
  for (let i = 0; i < sets.rows.length; i += 1) {
    const cards = await res.locals.db.query(cardDataSQL, [sets.rows[i].cardset_id]);
    results.sets.push({ setName: sets.rows[i].label, cards: cards.rows.map((c) => ({ cardFront: c.question, cardBack: c.answer })) });
  }

  res.locals.all = results;
  return next();
};


module.exports = cardController;
