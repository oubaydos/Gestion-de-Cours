const express = require("express");
const router = express.Router();
const Course = require("../../../models/Course");

router.get("/:keyword", async (req, res) => {
  await Course.find(
    { title: { $regex: ".*" + req.params.keyword + ".*" } },
    (err, rst) => {
      if (err)
        return res.status(410).json({
          errors: err,
        });
      else if (rst) {
        let data = rst;
        res.status(200).json(data);
      } else res.status(200).send("Not Found");
    }
  );
});
module.exports = router;
