const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./api');

app.use(express.json());

// routes all client requests

app.use('/api', apiRouter);

// handles initial page load when in production
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.use('*', (req, res) => res.status(404).send('page not found'));

app.use(function errorHandler(err, req, res, next) {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultError, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, console.log('listening on 3000'));
