const mongoose = require("mongoose");
const CertificateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId, //not sure
    ref: "Student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId, //not sure
    ref: "Course",
    required: true,
  },
});
let Certificate = mongoose.model("Certificate", CertificateSchema);
module.exports = Certificate;
