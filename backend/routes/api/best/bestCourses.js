const express = require("express");
const router = express.Router();
const Course = require("../../../models/Course");

router.get("/", async (req, res) => {
  await Course.find({}, (err, rst) => {
    if (err || rst === null || rst === undefined)
      return res.status(410).json({
        errors: err,
      });
    else {
      let data = rst;
      data.sort((a, b) =>
        b.rating > a.rating ? 1 : a.rating > b.rating ? -1 : 0
      );
      res.status(200).json(data.slice(0, 4));
    }
  });
});
module.exports = router;
