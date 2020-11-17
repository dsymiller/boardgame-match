const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.post('/api/test', (req, res) => {
  if (req.body.message === 'hello world') {
    res.status(200).send('right back at ya');
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.listen(3000, console.log('listening on 3000'));
