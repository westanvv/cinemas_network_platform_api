const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const response_ = require('../libs/response');

module.exports = (app) => {

  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  }

  //parse body params and attach them to req.body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());

  //secure apps by setting various HTTP headers
  app.use(helmet());

  //enable CORS
  app.use(cors());

  //just for test
  app.use((req, res, next) => {
    res = response_(res);
    next();
  });

};
