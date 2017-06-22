const default_ = require('./default');
const cinema = require('./cinema');
const film = require('./film');

module.exports = (app) => {
  app.use('/', default_);
  app.use('/cinema', cinema);
  app.use('/film', film);
};
