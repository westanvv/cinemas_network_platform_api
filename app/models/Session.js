const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  date_start: Date,
  date_finish: Date
});

module.exports = mongoose.model('sessions', SessionSchema);
