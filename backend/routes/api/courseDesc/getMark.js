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
        await Student.findById(req.student.id, (err, data) => {
          if (err || !data) {
            error1 = err + "erreur dans l'etudiant ";
            return;
          }
          let mark = "le cours n'est pas encore noté par le prof";
          let rated = false;
          for (let i of data.finishedCourses) {
            if (i.course === req.body.id) {
              mark = i.mark;
              i.rated !== undefined ? (rated = i.rated) : (rated = false);
              if (mark !== undefined)
                return res.status(200).json({ mark, rated });
              return res
                .status(200)
                .json({
                  mark: "le cours n'est pas encore noté par le prof",
                  rated,
                });
            }
          }
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
