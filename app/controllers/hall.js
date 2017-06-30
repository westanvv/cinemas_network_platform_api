const mongoose = require('mongoose');
const Hall = require('../models/Hall');

module.exports = {
  getAll,
  getElement,
  add,
  update
};

function getAll(req, res, next) {
  Hall.find({}).then((data, err) => {
    if (err) return next(err);

    res.send(data);
  });
}

function getElement(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Hall.findById(req.params.id).then((data, err) => {
    if (err) return next(err);
    if (!data) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  });
}

function add(req, res, next) {
  Hall.create({
    name    : req.body.name || 'New Hall',
    places : req.body.places || 0,
  }, (err, data) => {
    if (err) return next(err);

    res.json({
      _id: data._id
    });
  });
}

function update(req, res, next) {
  Hall.update({
    _id: req.params.id,
  }, { $set: req.body }, (err, data) => {
    if (err) return next(err);

    res.send();
  });
}
