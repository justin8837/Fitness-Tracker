console.log("hello");
$("#submit").on("click", function() {
  const plan = $("#plansInput").val();
  $.ajax({
    method: "post",
    url: "/api/plan",
    data: { plan }
  })
    .then(function(res) {
      console.log(res);
      window.location.reload();
    })
    .catch(function(err) {
      console.log(err);
    });
});

$(".delete").on("click", function() {
  const planID = $(this).data("planid");
  console.log(planID);
  $.ajax({
    method: "delete",
    url: "/api/plan/" + planID
  }).then(function() {
    console.log("deleted");
    window.location.reload();
  });
});

$(".addExercise").on("click", function() {
  const planID = $(this).data("planid");
  const exercise = $(this)
    .parent()
    .find(".exerciseInput")
    .val();
  $.ajax({
    method: "post",
    url: "/api/exercise",
    data: { planID, exercise }
  }).then(function() {
    console.log("exercise added");
    window.location.reload();
  });
});
