const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Course = require("../../../models/Course");
let error;
let tempArr;
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    console.log(req.user + req.student + req.prof);
    if (req.student) {
      if (!error1 && !error2 && !error)
        await Student.findById(req.student.id, (err, data) => {
          if (err || !data) {
            error1 = err + "erreur dans l'etudiant ";
            return;
          }
          tempArr = data.finishedCourses;
          for (let i of tempArr) {
            if (i.course === req.body.id) {
              i.rated = true;
              break;
            }
          }
        }).then(async () => {
          await Course.findOneAndUpdate(
            { _id: req.body.id },
            {
              $inc: {
                rating: req.body.mark,
                numberOfDoneStudents: 1,
              },
            }
          );
          await Student.findOneAndUpdate(
            { _id: req.student.id },
            { $set: { finishedCourses: tempArr } }
          );
        });
    } else if (req.prof) throw new Error("prof cant enroll courses");
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
