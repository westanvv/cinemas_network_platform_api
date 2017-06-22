const Cinema = require('../models/Cinema');

module.exports = {
  getAll,
};

function getAll(req, res, next) {
  Cinema.find({}).then((data, err) => {
    if (err) return next(err);

    console.log(data);
    res.send(data);
  });
}
