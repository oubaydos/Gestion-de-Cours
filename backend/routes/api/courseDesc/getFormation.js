const express = require("express");
const router = express.Router();
const Formation = require("../../../models/Formation");
const Prof = require("../../../models/Prof");

router.post("/", async (req, res) => {
  //res.send(req.body.id);
  await Formation.findById(req.body.id, async (err, rst) => {
    if (err || rst === null || rst === undefined)
      return res.status(410).json({
        errors: "formations : " + err,
      });
    else {
      let data = rst;
      await Prof.findById(data.instructor, async (e, donne) => {
        if (e || donne === null || donne === undefined)
          return res.status(410).json({
            errors: "teacher : " + err,
          });
        else {
          data["teacher"] =
            (await donne.firstName) + " " + (await donne.lastName);
        }

        res.status(200).json({ data: data, teacher: data.teacher });
      });
    }
  });
});
module.exports = router;
