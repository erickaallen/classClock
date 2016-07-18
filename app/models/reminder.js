// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define our model
var reminderSchema = new Schema({
  eventName: String,
  studentNames: Array,
  date: Date,
  note: String
});

var Reminder = mongoose.model('Reminder', reminderSchema);

// module.exports allows us to pass this to other files when it is called
module.exports = Reminder;
