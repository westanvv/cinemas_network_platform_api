const Hall = require('../models/Hall');

module.exports = {
  getAll,
};

function getAll(req, res, next) {
  Hall.find({}).then((data, err) => {
    if (err) return next(err);

    res.send(data);
  });
}
