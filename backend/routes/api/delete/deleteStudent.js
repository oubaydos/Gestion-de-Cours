const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");

router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null,
      error = null;
    if (req.admin)
      await Student.deleteOne({ email: req.body.email }, (err, data) => {
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
