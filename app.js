require('dotenv').config();

const express = require('express');
const app = express();

app.set('package', require('./package.json'));

require('./config/db');
require('./app/middlewares')(app);
require('./app/routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  err = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
