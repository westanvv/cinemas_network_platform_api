const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  name: String,
  address: String
});

module.exports = mongoose.model('halls', HallSchema);
