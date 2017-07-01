const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CinemaSchema = new Schema({
  name    : String,
  address : String,
  halls   : [
    { type: Schema.Types.ObjectId, ref: 'halls'}
  ]
});

module.exports = mongoose.model('cinemas', CinemaSchema);
