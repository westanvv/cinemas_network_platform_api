const mongoose = require('mongoose');
const Session = require('../models/Session');

module.exports = {
  getAll,
  getElement,
  add,
  update
};

function getAll(req, res, next) {
  Session.find({}).then((data, err) => {
    if (err) return next(err);

    res.send(data);
  });
}

function getElement(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Session.findById(req.params.id).then((data, err) => {
    if (err) return next(err);
    if (!data) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  });
}

function add(req, res, next) {
  Session.create({
    date_start  : req.body.date_start || Date.now,
    date_finish : req.body.date_finish || Date.now,
  }, (err, data) => {
    if (err) return next(err);

    res.json({
      _id: data._id
    });
  });
}

function update(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Session.update({
    _id: req.params.id,
  }, { $set: req.body }, (err, data) => {
    if (err) return next(err);
    if (data.n === 0) {
      res.sendStatus(304);
    } else {
      res.sendStatus(200);
    }
  });
}
