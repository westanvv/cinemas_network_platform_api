const Cinema = require('../models/Cinema');

module.exports = {
  getAll,
  getElement,
  add,
  update
};

function getAll(req, res, next) {
  Cinema.find({}).then((data, err) => {
    if (err) return next(err);

    next({ttt: 3});
    // res.send(data);
  });
}

function getElement(req, res, next) {
  Cinema.find({}).then((data, err) => {
    if (err) return next(err);

    res.send(data);
  });
}


function add(req, res, next) {
  Cinema.create({
    name    : req.body.name || 'New cinema',
    address : req.body.address || '',
  }, (err, data) => {
    if (err) return next(err);

    res.json(data);
  });
}

function update(req, res, next) {
  // Cinema.update({
  //   _id: req.body.name || 'New cinema',
  //   address : req.body.address || '',
  // }, {
  //
  // }, (err, data) => {
  //   if (err) return next(err);
  //
  //   res.json(data);
  // });
}
