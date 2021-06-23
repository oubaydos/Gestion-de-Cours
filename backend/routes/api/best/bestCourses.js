const express = require("express");
const router = express.Router();
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");

let ans = [];
router.get("/", async (req, res) => {
  console.log("tfgffffffffffffffesz");
  // return res.send("done");
  await Course.find({}, async (err, rst) => {
    console.log(rst);
    if (err || rst === null || rst === undefined) {
      return res.status(410).json({
        errors: err || "no courses found",
        rst: rst === null ? null : rst === undefined ? undefined : "full",
      });
    } else {
      let data = rst;
      let sortFunc = (a, b) => {
        if (
          a.numberOfDoneStudents == b.numberOfDoneStudents &&
          b.numberOfDoneStudents == 0
        ) {
          return 0;
        }
        if (a.numberOfDoneStudents != 0 && b.numberOfDoneStudents == 0) {
          return a.rating !== 0 ? -1 : 1;
        }
        if (a.numberOfDoneStudents == 0 && b.numberOfDoneStudents != 0) {
          return b.rating !== 0 ? 1 : -1;
        }
        let bRating = b.rating / b.numberOfDoneStudents;
        let aRating = a.rating / a.numberOfDoneStudents;
        if (bRating > aRating) {
          return 1;
        }
        if (aRating > bRating) return -1;
        return 0;
      };
      data.sort(
        sortFunc
        // (a, b) =>
        // b.rating > a.rating ? 1 : a.rating > b.rating ? -1 : 0
      );
      data.forEach((item) =>
        console.log(item.rating, " ", item.numberOfDoneStudents)
      );
      let breakOut = false;
      ans = [];
      data.forEach(async (item, index) => {
        if (breakOut) return;
        if (index >= 4) return;
        await Prof.findById(item.instructor, (e, donne) => {
          if (e || donne === null || donne === undefined) {
            console.log("error 410 : ", /*e ||*/ "prof id not found");
            breakOut = true;
            return res.status(410).json({
              errors: e || "prof id not found",
            });
          } else {
            ans.push({ item, prof: donne.firstName + " " + donne.lastName });
            if (index === 3) {
              //console.log(ans);
              res.status(200).json(ans);
            }
          }
        });
      });
    }
  });
});
module.exports = router;
