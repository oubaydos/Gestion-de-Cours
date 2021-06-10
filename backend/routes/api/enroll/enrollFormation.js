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
            error1 = err || "cela n'est pas une formation";
          }
        });
      if (!error1 && !error2 && !error)
        await Student.findById(req.student.id, (err, data) => {
          if (err || !data) {
            error1 = err + "erreur dans l'etudiant ";
            return;
          }
          for (let i of data.enrolledFormations) {
            if (i.formation === req.body.formationId) {
              error1 = "vous etes deja inscrits à cette formation !";
            }
          }
          for (let i of data.startedFormations) {
            if (i.formation === req.body.formationId) {
              error1 = "vous etes deja inscrits à cette formation !";
            }
          }
          for (let i of data.finishedFormations) {
            if (i.formation === req.body.formationId) {
              error1 = "vous etes deja inscrits à cette formation !";
            }
          }
        });
      if (!error1 && !error2 && !error) {
        await Student.findOneAndUpdate(
          { _id: req.student.id },
          {
            $push: {
              enrolledFormations: {
                formation: req.body.formationId,
                enrollingTime: currentTime,
              },
            },
          }
        );
        res.send("all is good");
      }
    } else if (req.prof) throw new Error("prof cant enroll formations");
    error1 === null ? (error = error2) : (error = error1);
    console.log("ftna err");
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
