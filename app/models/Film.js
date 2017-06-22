const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
  title:        String,
  description:  String,
  year:         String,
  duration:     String,
  directors:    [String],
  actors:       [String],
  genres:       [String],
  rating_count: { type: Number, default: 0 },
  rating:       { type: Number, default: 0 },
});

module.exports = mongoose.model('films', FilmSchema);
