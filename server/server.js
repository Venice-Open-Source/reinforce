const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.use('/build/', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log('Your flash cards are now listening on port:', PORT);
});