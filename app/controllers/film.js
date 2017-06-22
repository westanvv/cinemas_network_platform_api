const Film = require('../models/Film');

module.exports = {
  getAll,
  addElement,
  getElement,
};

function getAll(req, res, next) {
  Film.find({}).then((data, err) => {
    if (err) return next(err);

    res.send(data);
  });
}

function addElement(req, res, next) {
  Film.create({
    title:        '555',
    description:  '151651',
    year:         '2222',
    duration:     '1h 33min',
    directors:    [ 'one' ],
    actors:       [ 'one', 'two'],
    genres:       [],
    rating_count: 2,
    rating:       5.5,
  }, (err, data) => {
    if (err) return next(err);

    console.log(data);
    res.send({
      result: 'ok'
    });
  });
}

function getElement(req, res, next) {
  Film.find({}).then((data, err) => {
    if (err) return next(err);

    res.send(data);
  });
}
