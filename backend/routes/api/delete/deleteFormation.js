const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Formation = require("../../../models/Formation");
const Student = require("../../../models/Student");

router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null,
      error = null;
    console.log(req.admin);
    if (req.prof || req.admin)
      await Formation.deleteOne({ _id: req.body.id }, (err, data) => {
        if (err) {
          console.log("err");
          error1 = err;
          return;
        }
        if (data) return res.status(200).send(data);
        else error1 = new Error("no data found");
      }).then(async () => {
        await Student.updateMany(
          { enrolledFormations: { $elemMatch: { formation: req.body.id } } },
          { $pull: { enrolledFormations: { formation: req.body.id } } },
          (er, da) => {
            console.log(da);
          }
        );
        await Student.updateMany(
          { startedFormations: { $elemMatch: { formation: req.body.id } } },
          { $pull: { startedFormations: { formation: req.body.id } } },
          (er, da) => {
            console.log(da);
          }
        );
        await Student.updateMany(
          { finishedFormations: { $elemMatch: { formation: req.body.id } } },
          { $pull: { finishedFormations: { formation: req.body.id } } },
          (er, da) => {
            console.log(da);
          }
        );
      });

    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur");
  }
});
module.exports = router;
