const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Course = require("../../../models/Course");
let error;
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    console.log(req.user + req.student + req.prof);
    if (req.student) {
      if (!error1 && !error2 && !error)
        await Course.findById(req.body.id, (err, data) => {
          if (err || !data) {
            error1 = err || "cela n'est pas un cours";
            console.log("hna", req.body.id);
          }
        });
      if (!error1 && !error2 && !error)
        await Student.findById(req.student.id, async (err, data) => {
          if (err || !data) return (error1 = err || "auth problem");
          let temp = data.startedCourses;
          for (let i of temp) {
            if (i.course === req.body.id) {
              i.currentChapter = req.body.currentChapter;
            }
          }
          await Student.findOneAndUpdate(
            { _id: req.student.id },
            {
              startedCourses: temp,
            },
            (err, data) => {
              if (err || !data) {
                error1 = err + "erreur dans l'etudiant ";
                return;
              }
            }
          );
        });

      if (!error1 && !error2 && !error) {
        res.send("all is good");
      }
    } else if (req.prof) throw new Error("prof cant enroll courses");
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
