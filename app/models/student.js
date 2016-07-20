// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define our model
var StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  groups: Array,
  reminders: Array,
  note: String
});

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Student', StudentSchema);
