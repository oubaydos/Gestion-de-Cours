const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Formation = require("../../../models/Formation");
let error;
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    let currentTime = new Date().getTime();
    console.log(req.user + req.student + req.prof);
    if (req.student) {
      if (!error1 && !error2 && !error)
        await Formation.findById(req.body.formationId, (err, data) => {
          if (err || !data) {
            error1 = err || "cela n'est pas un cours";
          }
        });
      if (!error1 && !error2 && !error) {
        await Student.findOneAndUpdate(
          { _id: req.student.id },
          {
            $pull: {
              enrolledFormations: {
                formation: req.body.formationId,
              },
            },
          }
        );
        res.send("all is good");
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
