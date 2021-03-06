const express = require('express');

const apiRouter = express.Router();
const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');
const setController = require('../controllers/setController');
const cardController = require('../controllers/cardController');
const authControllers = require('../controllers/authControllers');

// ---------------------------------
//            user
// ---------------------------------

// all of these middleware functions (except post/create) expect auth to pass id of user
// via res.locals.userID

// get user by id
apiRouter.get('/user/', authControllers.checkCookie, dbController.getDb, userController.getUser, (req, res) => {
  res.status(200);
  res.json(res.locals.user);
});

// create a user
apiRouter.post('/user/', dbController.getDb, userController.createUser, (req, res) => {
  res.status(200);
  res.json(res.locals.user);
});

// update a user
apiRouter.put('/user/', authControllers.checkCookie, dbController.getDb, userController.updateUser, (req, res) => {
  res.status(200);
  res.end();
});

// delete a user
apiRouter.delete('/user/', authControllers.checkCookie, dbController.getDb, userController.deleteUser, (req, res) => {
  res.status(200);
  res.end();
});

// // ---------------------------------
// //            set
// // ---------------------------------

// all of these middleware functions expect auth to pass id of user
// via res.locals.userID

// get card set by id
apiRouter.get('/set/', authControllers.checkCookie, dbController.getDb, setController.getSet, (req, res) => {
  res.status(200);
  res.json(res.locals.set);
});

// create a card set
apiRouter.post('/set/', authControllers.checkCookie, dbController.getDb, setController.createSet, (req, res) => {
  res.status(200);
  res.json(res.locals.set);
});

// update a card set
apiRouter.put('/set/', authControllers.checkCookie, dbController.getDb, setController.updateSet, (req, res) => {
  res.status(200);
  res.end();
});

// delete a card set
apiRouter.delete('/set/', authControllers.checkCookie, dbController.getDb, setController.deleteSet, (req, res) => {
  res.status(200);
  res.end();
});

// get all card sets for user
apiRouter.get('/sets/', authControllers.checkCookie, dbController.getDb, setController.getSets, (req, res) => {
  res.status(200);
  res.json(res.locals.set);
});


// ---------------------------------
//            card
// ---------------------------------

// all of these middleware functions expect auth to pass id of user
// via res.locals.userID

// get card by id
apiRouter.get('/card/', authControllers.checkCookie, dbController.getDb, cardController.getCard, (req, res) => {
  res.status(200);
  res.json(res.locals.set);
});

// create a card
apiRouter.post('/card', authControllers.checkCookie, dbController.getDb, cardController.createCard, (req, res) => {
  res.status(200);
  res.json(res.locals.card);
});

// update a card
apiRouter.put('/card/', authControllers.checkCookie, dbController.getDb, cardController.updateCard, (req, res) => {
  res.status(200);
  res.end();
});

// delete a card
apiRouter.delete('/card/', authControllers.checkCookie, dbController.getDb, cardController.deleteCard, (req, res) => {
  res.status(200);
  res.end();
});

// delete all cards for set
apiRouter.delete('/cards/', authControllers.checkCookie, dbController.getDb, cardController.deleteCardsForSet, (req, res) => {
  res.status(200);
  res.end();
});

// get all cards and sets for a user
apiRouter.get('/cards/all', authControllers.checkCookie, dbController.getDb, cardController.getCardsForEverySet, (req, res) => {
  res.status(200);
  res.json(res.locals.all);
});

// get all cards for a set
apiRouter.get('/cards/:setid', authControllers.checkCookie, dbController.getDb, cardController.getCardsForSet, (req, res) => {
  res.status(200);
  res.json(res.locals.set);
});

module.exports = apiRouter;
