const express = require("express");
const router = express.Router();
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");
let ans = [];
router.get("/", async (req, res) => {
  await Course.find({}, async (err, rst) => {
    if (err || rst === null || rst === undefined) {
      console.log("erreur 410 : ", /*err ||*/ "course id not found");
      return res.status(410).json({
        errors: err || "course id not found",
      });
    } else {
      // res.status(200).json(data);
      let breakOut = false;
      ans = [];
      rst.forEach(async (item, index) => {
        if (breakOut) return;
        await Prof.findById(item.instructor, (e, donne) => {
          if (e || donne === null || donne === undefined) {
            console.log("error 410 : ", /*e ||*/ "prof id not found");
            breakOut = true;
            return res.status(410).json({
              errors:
                e ||
                "prof id not found : index : " +
                  index +
                  " prof id : " +
                  item.instructor,
            });
          } else {
            let data = { item, prof: donne.firstName + " " + donne.lastName };
            ans.push(data);
          }
        });
        if (index === rst.length - 1) {
          console.log(ans);
          res.status(200).json(ans);
        }
      });
    }
  });
});
module.exports = router;
