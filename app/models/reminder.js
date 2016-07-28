// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Sugar = require('sugar');

//define our schema
var ReminderSchema = new Schema({
  date: Date,
  eventName: String,
  studentNames: String,
  note: String
});

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Reminder', ReminderSchema);
