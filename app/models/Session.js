const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  date_start  : Date,
  date_finish : Date,
  cinema      : { type: Schema.Types.ObjectId, ref: 'cinemas'},
  hall        : { type: Schema.Types.ObjectId, ref: 'halls'},
  film        : { type: Schema.Types.ObjectId, ref: 'films'},
});

module.exports = mongoose.model('sessions', SessionSchema);
