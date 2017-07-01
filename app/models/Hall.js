const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  name: String,
  places: Number
});

module.exports = mongoose.model('halls', HallSchema);
