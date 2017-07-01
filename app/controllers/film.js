const mongoose = require('mongoose');
const logger = require('../libs/logger')(module);

const Film = require('../models/Film');
const utils = require('../libs/utils');

module.exports = {
  getAll,
  getElement,
  add,
  del,
  update,
  parse
};

function getAll(req, res, next) {
  Film.find({})
    .then((data, err) => {
      if (err) return next(err);

      res.send(data);
    });
}

function getElement(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.sendStatus(404);

  Film.findById(req.params.id)
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
  Film.create({
    title         : req.body.title || 'New film',
    description   : req.body.description || '',
    year          : req.body.year || 0,
    duration      : req.body.duration || 0,
    directors     : req.body.directors || [],
    creators      : req.body.directors || [],
    actors        : req.body.actors || [],
    genres        : req.body.genres || [],
    content_rating: req.body.content_rating || '',
    rating_count  : req.body.rating_count || 0,
    rating        : req.body.rating || 0,
  })
    .then((data, err) => {
      if (err) return next(err);

      res.json({
        _id: data._id
      });
    });
}

function del(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.sendStatus(404);
  }

  Film.findById(req.params.id)
    .remove()
    .then((data, err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
}

function update(req, res, next) {
  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.sendStatus(404);

  Film.findByIdAndUpdate(
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

function parse(req, res, next) {

  const parsingUrl = url => {
    logger.info(`Parsing ${url}`);

    return utils.readUrl(url)
      .then(pageSource => {
        let filmObj = {};
        let matches = [];

        matches = utils.matchAll(
          /<div class="originalTitle">(.*?)<span class="description">/g,
          pageSource
        );
        if (matches.length > 0) {
          filmObj.title = matches[0];
        }

        matches = utils.matchAll(
          /<div class="summary_text" itemprop="description">([\s\S.]*?)<\/div>/g,
          pageSource
        );
        if (matches.length > 0) {
          filmObj.description = matches[0].trim();
        }

        matches = utils.matchAll(
          /id="titleYear"[\s\S]*?>(.*?)<\/a/g,
          pageSource
        );
        if (matches.length > 0) {
          filmObj.year = matches[0];
        }

        matches = utils.matchAll(
          /<time itemprop="duration" datetime="PT(.*?)M">/g,
          pageSource
        );
        if (matches.length > 0) {
          filmObj.duration = matches[0];
        }

        matches = utils.matchAll(
          /<span class="itemprop" itemprop="genre">(.*?)<\/span>/g,
          pageSource
        );
        filmObj.genres = matches;

        matches = utils.matchAll(
          /<meta itemprop="contentRating" content="(.*?)">/g,
          pageSource
        );
        if (matches.length > 0) {
          filmObj.content_rating = matches[0];
        }

        matches = utils.matchAll(
          /<span itemprop="director" itemscope itemtype="http:\/\/schema\.org\/Person">[\s\S]*?itemprop="name">(.*?)<\/span>/g,
          pageSource
        );
        filmObj.directors = matches;

        matches = utils.matchAll(
          /<span itemprop="creator" itemscope itemtype="http:\/\/schema\.org\/Person">[\s\S]*?itemprop="name">(.*?)<\/span>/g,
          pageSource
        );
        filmObj.creators = matches;

        matches = utils.matchAll(
          /<span itemprop="actors" itemscope itemtype="http:\/\/schema\.org\/Person">[\s\S]*?itemprop="name">(.*?)<\/span>/g,
          pageSource
        );
        filmObj.actors = matches;

        matches = utils.matchAll(
          /<span class="small" itemprop="ratingCount">(.*?)<\/span>/g,
          pageSource
        );
        if (matches.length > 0) {
          filmObj.rating_count = matches[0].replace(/[, ]/, '');
        }

        matches = utils.matchAll(
          /<span itemprop="ratingValue">(.*?)<\/span>/g,
          pageSource
        );
        if (matches.length > 0) {
          filmObj.rating = matches[0].replace(/,/, '.');
        }

        return Film.create({
          title         : filmObj.title || 'New film',
          description   : filmObj.description || '',
          year          : filmObj.year || 0,
          duration      : filmObj.duration || 0,
          directors     : filmObj.directors || [],
          creators      : filmObj.directors || [],
          actors        : filmObj.actors || [],
          genres        : filmObj.genres || [],
          content_rating: filmObj.content_rating || '',
          rating_count  : filmObj.rating_count || 0,
          rating        : filmObj.rating || 0,
        })
          .then((data, err) => {
            if (err) return Promise.reject(err);

            return Promise.resolve({
              _id: data._id
            });
          });
      })
      .catch(err => {
        return Promise.reject(err);
      })
  };

  //Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.sendStatus(404);

  //Check halls
  if (req.body.length === 0)
    return res.sendStatus(200);

  let promises = [];
  req.body.forEach(currentValue => {
    promises.push(parsingUrl(currentValue));
  });
  Promise.all(promises)
    .then(data => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
}
