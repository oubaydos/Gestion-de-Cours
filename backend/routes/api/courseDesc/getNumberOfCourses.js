const express = require("express");
const router = express.Router();
const Formation = require("../../../models/Formation");

router.post("/", async (req, res) => {
  //res.send(req.body.id);
  await Formation.findById(req.body.id, async (err, rst) => {
    if (err || rst === null || rst === undefined)
      return res.status(410).json({
        errors: "formation erreur : " + err,
      });
    else {
      return res.status(200).json({
        numberOfCourses:
          rst.numberOfCourses !== undefined ? rst.numberOfCourses : 0,
      });
    }
  });
});
module.exports = router;
