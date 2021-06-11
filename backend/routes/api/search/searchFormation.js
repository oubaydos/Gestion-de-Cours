const express = require("express");
const router = express.Router();
const Formation = require("../../../models/Formation");

router.get("/:keyword", async (req, res) => {
  await Formation.find(
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
