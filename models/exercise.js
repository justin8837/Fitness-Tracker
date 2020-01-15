var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  complete: { type: Boolean, default: false }
});

var Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
