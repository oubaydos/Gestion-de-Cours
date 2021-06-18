const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  //array = [...timeOfEnrolling,timeOfEnding,rating,course : {object}]
  enrolledCourses: {
    type: Array, //[{ course: mongoose.Schema.Types.ObjectId, enrollingTime: Number }],
    default: [],
  },
  startedCourses: {
    type: Array,
    // [
    //   {
    //     course: mongoose.Schema.Types.ObjectId,
    //     startingTime: Number,
    //     currentChapter: Number,
    //   },
    // ],
    default: [],
  },
  finishedCourses: {
    type: Array,
    // [
    //   {
    //     course: mongoose.Schema.Types.ObjectId,
    //     startingTime: Number,
    //     finishingTime: Number,
    //     rated: Boolean,
    //   },
    // ],
    default: [],
  },
  enrolledFormations: {
    type: Array,
    default: [],
  },
  startedFormations: {
    type: Array,
    default: [],
  },
  finishedFormations: {
    type: Array,
    default: [],
  },
});
let Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
