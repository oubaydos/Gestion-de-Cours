const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Formation = require("../../../models/Formation");
let error;
router.post("/", auth, async (req, res) => {
  let startingTime = 0;

  try {
    let error1 = null,
      error2 = null;
    error = null;
    console.log(req.user + req.student + req.prof);
    if (req.student) {
      if (!error1 && !error2 && !error)
        await Formation.findById(req.body.id, (err, data) => {
          if (err || !data) {
            error1 = err || "cela n'est pas un formation";
          }
        }).then(async () => {
          if (!error1 && !error2 && !error)
            await Student.findById(req.student.id, (e, d) => {
              for (let i of d.startedFormations) {
                if (i.formation == req.body.id) {
                  return (startingTime = i.startingTime);
                }
              }
            }).then(async () => {
              await Student.findOneAndUpdate(
                { _id: req.student.id },
                { $pull: { startedFormations: { formation: req.body.id } } }
              );
              await Student.findOneAndUpdate(
                { _id: req.student.id },
                {
                  $addToSet: {
                    finishedFormations: {
                      formation: req.body.id,
                      startingTime,
                      finishingTime: new Date().getTime(),
                    },
                  },
                }
              );
            });
        });
    } else if (req.prof) throw new Error("prof cant enroll formations");
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
