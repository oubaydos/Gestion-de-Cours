const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Course = require("../../../models/Course");
const Formation = require("../../../models/Formation");
const Prof = require("../../../models/Prof");
let id = "";
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null,
      error = null;
    if (req.admin)
      await Prof.findOneAndDelete({ email: req.body.email }, (err, data) => {
        if (err) {
          console.log("err");
          error1 = err;
          return;
        }
        id = data._id;
        if (!data) error1 = new Error("no data found");
      }).then(async () => {
        await Formation.deleteMany({ instructor: id }).then(async () => {
          await Course.deleteMany({ instructor: id }, (e, r) => {
            if (e) return (error1 = e);
            return res.status(200).send(r);
          });
        });
      });
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur");
  }
});
module.exports = router;
