const mongoose = require('mongoose');
const Film = require('../models/Film');

module.exports = {
  getAll,
  getElement,
  add,
  update
};

function getAll(req, res, next) {
  Film.find({}).then((data, err) => {
    if (err) return next(err);

    res.send(data);
  });
}

function getElement(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Film.findById(req.params.id).then((data, err) => {
    if (err) return next(err);
    if (!data) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  });
}

function add(req, res, next) {
  Film.create({
    title         : req.body.title || 'New film',
    description   : req.body.description || '',
    year          : req.body.year || 0,
    duration      : req.body.duration || '',
    directors     : req.body.directors || [],
    actors        : req.body.actors || [],
    genres        : req.body.genres || [],
    rating_count  : req.body.rating_count || 0,
    rating        : req.body.rating || 0,
  }, (err, data) => {
    if (err) return next(err);

    res.json({
      _id: data._id
    });
  });
}

function update(req, res, next) {
  Film.update({
    _id: req.params.id,
  }, { $set: req.body }, (err, data) => {
    if (err) return next(err);

    res.send();
  });
}
