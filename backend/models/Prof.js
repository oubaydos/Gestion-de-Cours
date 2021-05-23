const mongoose = require("mongoose");
const ProfSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  authorise: {
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
  //array = [students (notes, currentState..),courses]
  courses: {
    type: Array,
    default: [],
  },
  formations: {
    type: Array,
    default: [],
  },
});
let Prof = mongoose.model("Professeur", ProfSchema);
module.exports = Prof;
