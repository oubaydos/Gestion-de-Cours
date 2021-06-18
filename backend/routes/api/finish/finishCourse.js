const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Course = require("../../../models/Course");
let error;
let startingTime = 0;
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
          }
        }).then(async () => {
          if (!error1 && !error2 && !error)
            await Student.findById(req.student.id, (e, d) => {
              for (let t of d.startedCourses) {
                if (t.course === req.body.id) {
                  startingTime = t.startingTime;
                }
              }
            }).then(async () => {
              await Student.findOneAndUpdate(
                { _id: req.student.id },
                {
                  $pull: {
                    startedCourses: { course: req.body.id },
                  },
                  $addToSet: {
                    finishedCourses: {
                      course: req.body.id,
                      startingTime: startingTime,
                      finishingTime: new Date().getTime(),
                    },
                  },
                },
                (err, data) => {
                  if (err || !data) {
                    error1 = err + "erreur dans l'etudiant ";
                    return;
                  }
                }
              ).then(() => {
                if (!error1 && !error2 && !error) {
                  res.send("all is good");
                }
              });
            });
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
