const mongoose = require("mongoose");
// i think it would be better if we had a seperate module for chapters and in chapter we take the order and the id of course
const CourseShema = new mongoose.Schema({
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

  numberOfChapters: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professeur", //to check
    required: true,
  },
  image: {
    type: String,
  },
});
let Course = mongoose.model("Cours", CourseShema);
module.exports = Course;
