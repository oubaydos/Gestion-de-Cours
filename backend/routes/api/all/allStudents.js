const express = require("express");
const router = express.Router();
const Student = require("../../../models/Student");

router.get("/", async (req, res) => {
  console.log("hello");
  await Student.find({}, (err, rst) => {
    console.log(rst);
    if (err || rst === null || rst === undefined) {
      console.log("erreur 410 : ", err);
      return res.status(410).json({
        errors: err,
      });
    } else {
      let data = rst;
      res.status(200).json(data);
    }
  });
});
module.exports = router;
