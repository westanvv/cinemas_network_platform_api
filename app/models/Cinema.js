const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema({
  name: String,
  address: String
});

module.exports = mongoose.model('Cinema', CinemaSchema);
