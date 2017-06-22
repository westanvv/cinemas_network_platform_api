const Session = require('../models/Session');

module.exports = {
  getAll,
};

function getAll(req, res, next) {
  Session.find({}).then((data, err) => {
    if (err) return next(err);

    res.send(data);
  });
}
