const mongoose = require("mongoose");
// i think it would be better if we had a seperate module for chapters and in chapter we take the order and the id of course
const FormationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numberOfCourses: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professeur", //to check
    default: "60c1f7953d85d19ae170ef86",
  },
  image: {
    type: String,
    //add a default image to all these models
  },
  courses: {
    type: Array,
    default: [],
  },
  numberOfDoneStudents: {
    type: Number,
    default: 0,
  },
});
let Formation = mongoose.model("Formation", FormationSchema);
module.exports = Formation;
