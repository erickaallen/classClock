// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define our model
var studentSchema = new Schema({
  name: String,
  groups: Array,
  reminders: Array,
  note: String
});

var Student = mongoose.model('Student', studentSchema);

// module.exports allows us to pass this to other files when it is called
module.exports = Student;
