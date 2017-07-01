const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
  title           : String,
  description     : String,
  year            : { type: Number, default: 0 },
  duration        : { type: Number, default: 0 },
  directors       : [String],
  creators        : [String],
  actors          : [String],
  genres          : [String],
  content_rating  : String,
  rating_count    : { type: Number, default: 0 },
  rating          : { type: Number, default: 0 },
});

module.exports = mongoose.model('films', FilmSchema);
