const mongoose = require("mongoose");
// i think it would be better if we had a seperate module for chapters and in chapter we take the order and the id of course
const ChapterShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
  },
  courseId: {
    type: mongoose.Types.ObjectId, //not sure
    required: true,
  },
});
let Chapter = mongoose.model("Chapter", ChapterShema);
module.exports = Chapter;
