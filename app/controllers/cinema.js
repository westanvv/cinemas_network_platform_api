const mongoose = require('mongoose');
const Promise = require("bluebird");
const Cinema = require('../models/Cinema');

module.exports = {
  getAll,
  getElement,
  add,
  update,
  addHalls,
  delHalls,
  getHalls,
  getFilms,
};

function getAll(req, res, next) {
  Cinema.find({})
    .then((data, err) => {
      if (err) return next(err);

      res.send(data);
    });
}

function getElement(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Cinema.findById(
    req.params.id
  )
    .then((data, err) => {
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
  })
    .then((data, err) => {
      if (err) return next(err);

      res.json({
        _id: data._id
      });
    });
}

function update(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Cinema.findByIdAndUpdate(
    req.params.id,
    { $set: req.body }
  )
    .then((data, err) => {
    if (err) return next(err);
    if (data.n === 0) {
      res.sendStatus(304);
    } else {
      res.sendStatus(200);
    }
  });
}

function addHalls(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.sendStatus(404);
  //Check halls
  if (req.body.length === 0)
    return res.sendStatus(200);

  //Check valid hall ObjectId
  for (let index = 0; index < req.body.length; index++) {
    if (!mongoose.Types.ObjectId.isValid(req.body[index]))
      return res.sendStatus(404);
  }

  let promises = [];
  req.body.forEach(currentValue => {
    promises.push(
      Cinema.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { halls: currentValue }}
      )
        .then((data, err) => {
          if (err) return Promise.reject(err);
        })
    );
  });
  Promise.all(promises)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
}

function delHalls(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.sendStatus(404);
  //Check halls
  if (req.body.length === 0)
    return res.sendStatus(200);

  let promises = [];
  req.body.forEach(currentValue => {
    promises.push(
      Cinema.findByIdAndUpdate(
        req.params.id,
        { $pull: { halls: currentValue }}
      )
        .then((data, err) => {
          if (err) return Promise.reject(err);
        })
    );
  });
  Promise.all(promises)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
}

function getHalls(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Cinema.findById(req.params.id)
    .select('halls')
    .populate('halls')
    .then((data, err) => {
      if (err) return next(err);
      if (!data) {
        res.sendStatus(404);
      } else {
        res.json(data);
      }
    });
}

function getFilms(req, res, next) {

}
