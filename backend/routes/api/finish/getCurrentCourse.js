const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
let error;
let result = 0;
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
            error1 = err || "auth problem";
            console.log("hna", req.body.id);
          } else {
            for (let i of data.finishedFormations) {
              if (i.formation === req.body.id) {
                i.currentCourse === undefined
                  ? (result = 0)
                  : (result = i.currentCourse);
                return;
              }
            }
            error1 = "this formation is not finished yet";
          }
        });

      if (!error1 && !error2 && !error) {
        res.status(200).json({ currentCourse: result });
      }
    } else if (req.prof) throw new Error("prof cant enroll formations");
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
