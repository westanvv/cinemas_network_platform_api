const mongoose = require('mongoose');
const Promise = require("bluebird");
const moment = require('moment');

const Session = require('../models/Session');
const Film = require('../models/Film');

module.exports = {
  getAll,
  getElement,
  add,
};

function getAll(req, res, next) {
  Session.find({})
    .then((data, err) => {
      if (err) return next(err);

      res.send(data);
    });
}

function getElement(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.sendStatus(404);

  Session.findById(req.params.id)
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
  //Check required values
  if (
    !req.body.date_start ||
    !req.body.cinema ||
    !req.body.hall ||
    !req.body.film
  ) {
    return res.sendStatus(400);
  }

  //Check valid ObjectId
  if (
    !mongoose.Types.ObjectId.isValid(req.body.cinema) ||
    !mongoose.Types.ObjectId.isValid(req.body.hall) ||
    !mongoose.Types.ObjectId.isValid(req.body.film)
  ) {
    return res.sendStatus(404);
  }

  //Find date end
  let dateFinish = req.body.date_finish;
  new Promise(function (resolve, reject) {
    if (!dateFinish) {
      Film.findById(req.body.film)
        .then((data, err) => {
          if (err) reject(err);
          if (!data || data.duration <= 0) {
            res.sendStatus(404);
            reject();
          } else {
            dateFinish = moment(req.body.date_start).add(data.duration, 'minutes').utc().toISOString();
            resolve();
          }
        });
    } else {
      resolve();
    }
  })
    .then(() => {
      if (req.body.date_start >= dateFinish) {
        res.sendStatus(404);
        return Promise.reject();
      }
    })
    .then(() => {
      //There are 6 possible variants for dates relation, but we need check 4 of them
      const localDateStart = new Date(req.body.date_start);
      const localDateFinish = new Date(dateFinish);

      return Session.findOne(
        {
          $and: [
            { hall: { $eq: req.body.hall }},
            {
              $or: [{
                $and: [
                  { date_start: { $lte: new Date(localDateStart) } },
                  { date_finish: { $gte: new Date(localDateFinish) } },
                ]
              }, {
                $and: [
                  { date_start: { $lte: new Date(localDateStart) } },
                  { date_finish: { $lte: new Date(localDateFinish) } },
                  { date_finish: { $gte: new Date(localDateStart) } },
                ]
              }, {
                $and: [
                  { date_start: { $gte: new Date(localDateStart) } },
                  { date_start: { $lte: new Date(localDateFinish) } },
                  { date_finish: { $gte: new Date(localDateFinish) } },
                ]
              }, {
                $and: [
                  { date_start: { $gte: new Date(localDateStart) } },
                  { date_finish: { $lte: new Date(localDateFinish) } },
                ]
              }]
            }
          ]
        }
      );
    })
    .then((data, err) => {
      if (err) return Promise.reject(err);
      if (data !== null) {
        res.sendStatus(204);
        return Promise.reject();
      }

      return Session.create({
        date_start: req.body.date_start,
        date_finish: dateFinish,
        cinema: req.body.cinema,
        hall: req.body.hall,
        film: req.body.film,
      });
    })
    .then((data, err) => {
        if (err) return Promise.reject(err);

        res.json({
          _id: data._id
        });
    })
    .catch(err => {
      if (err) next(err);
    });
}
