const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Course = require("../../../models/Course");
const Student = require("../../../models/Student");
const Formation = require("../../../models/Formation");
let newCourses = [];
let ids = [];
function courseExists(arr, name) {
  return arr.some(function (el) {
    return el.course === name;
  });
}
router.post("/", auth, async (req, res) => {
  function delOne(array) {
    let temp = array;
    temp.splice(temp.indexOf(req.body.id), 1);
    return temp;
  }
  try {
    let error1 = null,
      error2 = null,
      error = null;
    console.log(req.admin);
    if (req.prof || req.admin)
      await Course.deleteOne({ _id: req.body.id }, (err, data) => {
        console.log(req.body.courseId);
        if (err) {
          console.log("err");
          error1 = err;
          return;
        }
        if (data) return res.status(200).send(data);
        else error1 = new Error("no data found");
      }).then(async () => {
        await Formation.updateMany(
          { courses: { $in: [req.body.id] } },
          {
            $pull: { courses: { $in: [req.body.id] } },
            $inc: { numberOfCourses: -1 },
          },
          (e, d) => {
            if (e) return (error1 = e);
            console.log(d);
          }
        ).then(async () => {
          await Student.updateMany(
            { enrolledCourses: { $elemMatch: { course: req.body.id } } },
            { $pull: { enrolledCourses: { course: req.body.id } } },
            (er, da) => {
              console.log(da);
            }
          );
          await Student.updateMany(
            { startedCourses: { $elemMatch: { course: req.body.id } } },
            { $pull: { startedCourses: { course: req.body.id } } },
            (er, da) => {
              console.log(da);
            }
          );
          await Student.updateMany(
            { finishedCourses: { $elemMatch: { course: req.body.id } } },
            { $pull: { finishedCourses: { course: req.body.id } } },
            (er, da) => {
              console.log(da);
            }
          );
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
