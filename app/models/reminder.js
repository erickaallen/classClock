// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define our schema
var ReminderSchema = new Schema({
  eventName: String,
  studentNames: Array,
  date: Date, 
  note: String
});

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Reminder', ReminderSchema);
