const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Formation = require("../../../models/Formation");

router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null,
      error = null;
    console.log(req.admin);
    if (req.prof || req.admin)
      await Formation.deleteOne({ _id: req.body.id }, (err, data) => {
        console.log(req.body.courseId);
        if (err) {
          console.log("err");
          error1 = err;
          return;
        }
        if (data) return res.status(200).send(data);
        else error1 = new Error("no data found");
      });

    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur");
  }
});
module.exports = router;
