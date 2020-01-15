var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dailyPlans = new Schema({
  title: String, // String is shorthand for {type: String}
  date: { type: Date, default: Date.now },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }]
});

var Plans = mongoose.model("Plans", dailyPlans);

module.exports = Plans;
