const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/apiRouter');
const authControllers = require('./controllers/authControllers');

const PORT = 3000;

const app = express();

// use statements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser());
app.use('/build/', express.static(path.resolve(__dirname, '../build')));

app.use('/api', apiRouter);

// slash route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

/*                ROUTES FOR TESTING                */
// dummy route for testing authentication
app.post('/createUser', authControllers.createUser, authControllers.setCookie, (req, res) => {
  res.status(200).send('secret accessed');
});

// dummy routes for testing authentication
app.post('/login', authControllers.login, authControllers.setCookie, (req, res) => {
  res.status(200).send('secret accessed');
});

// dummy routes for testing authentication
app.get('/deleteCard', authControllers.checkCookie, (req, res) => {
  res.status(200).send('secret accessed');
});
/*                END ROUTES FOR TESTING                */


// handle all routes without a route handler
app.use('*', (req, res) => {
  res.status(404).send('Path not found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware handler',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log('Your flash cards are now listening on port:', PORT);
});
