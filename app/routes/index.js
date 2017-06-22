const default_ = require('./default');
const cinema = require('./cinema');

module.exports = (app) => {
  app.use('/', default_);
  app.use('/cinema', cinema);
};
