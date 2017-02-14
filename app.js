const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const router = require('./router');
const bodyParser = require('body-parser');

mongoose.connect(config.get('mongoUri'), (err) => {
  if (err) {
    console.log('connect error');
  } else {
    console.log('connect success');
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send({
    'hello': 'world'
  })
});

app.use(bodyParser.json());
router(app);

app.listen(config.get('httpPort'), () => {
  console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
});

module.exports = app;