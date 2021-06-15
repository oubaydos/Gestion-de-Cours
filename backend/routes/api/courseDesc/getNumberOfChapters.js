const express = require("express");
const router = express.Router();
const Course = require("../../../models/Course");

router.post("/", async (req, res) => {
  //res.send(req.body.id);
  await Course.findById(req.body.id, async (err, rst) => {
    if (err || rst === null || rst === undefined)
      return res.status(410).json({
        errors: "courss : " + err,
      });
    else {
      return res
        .status(200)
        .json({
          numberOfChapters: rst.numberOfChapters,
          type: rst.type || "video",
        });
    }
  });
});
module.exports = router;
