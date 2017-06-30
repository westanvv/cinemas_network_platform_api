const default_ = require('./default');
const cinema = require('./cinema');
const hall = require('./hall');
const film = require('./film');
const session = require('./session');

module.exports = (app) => {
  app.use('/', default_);
  app.use('/cinema', cinema);
  app.use('/hall', hall);
  app.use('/film', film);
  app.use('/session', session);
};
