const mongoose = require('mongoose');
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

    res.send(data);
  });
}

function getElement(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Cinema.findById(req.params.id).then((data, err) => {
    if (err) return next(err);
    if (!data) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  });
}

function add(req, res, next) {
  Cinema.create({
    name    : req.body.name || 'New cinema',
    address : req.body.address || '',
  }, (err, data) => {
    if (err) return next(err);

    res.json({
      _id: data._id
    });
  });
}

function update(req, res, next) {
  Cinema.update({
    _id: req.params.id,
  }, { $set: req.body }, (err, data) => {
    if (err) return next(err);

    res.send();
  });
}
