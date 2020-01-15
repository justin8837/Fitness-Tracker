var express = require("express");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var app = express();
var db = require("./models");
var mongoose = require("mongoose");

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  db.Plans.find({})
    .populate("exercises")
    .then(function(data) {
      console.log(data);
      res.render("index", { plans: data });
    });
});

app.post("/api/exercise", function(req, res) {
  const exercise = req.body.exercise;
  const planID = req.body.planID;
  db.Exercise.create({ title: exercise }).then(function(data) {
    const exerciseID = data._id;
    db.Plans.updateOne(
      { _id: planID },
      { $push: { exercises: exerciseID } }
    ).then(function() {
      res.json({});
    });
  });
});
app.post("/api/plan", function(req, res) {
  const plan = req.body.plan;
  console.log(plan);
  db.Plans.create({ title: plan })
    .then(function() {
      res.json({});
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.delete("/api/plan/:id", function(req, res) {
  const id = req.params.id;
  console.log(id);
  db.Plans.deleteOne({ _id: id })
    .then(function() {
      res.json({});
    })
    .catch(function(err) {
      console.log(err);
    });
});
mongoose.connect("mongodb://localhost/workout", { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
