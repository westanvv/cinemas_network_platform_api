const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  name: String,
  address: String
});

module.exports = mongoose.model('sessions', SessionSchema);
