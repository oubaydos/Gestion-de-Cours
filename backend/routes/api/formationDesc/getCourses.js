const express = require("express");
const router = express.Router();
const Formation = require("../../../models/Formation");
const Prof = require("../../../models/Prof");
const Course = require("../../../models/Course");
const Student = require("../../../models/Student");
const auth = require("../../../middleware/auth");
function courseExists(arr, name) {
  return arr.some(function (el) {
    return el.course == name;
  });
}
router.post("/", auth, async (req, res) => {
  let data = { teacher: "", courses: [], finished: [], started: [] };
  let cont = true;
  //res.send(req.body.id);
  if (!req.student) {
    return res.status(401).json({ msg: "vous n'etes pas un etudiant" });
  }
  await Formation.findById(req.body.id, async (err, rst) => {
    if (err || rst === null || rst === undefined) {
      return res.status(410).json({
        errors: "formations : " + err,
      });
      cont = false;
    } else {
      await Prof.findById(rst.instructor, async (e, donne) => {
        if (e || donne === null || donne === undefined) {
          cont = false;
          return res.status(410).json({
            errors: "formations : " + err,
          });
        } else {
          data["teacher"] =
            (await donne.firstName) + " " + (await donne.lastName);
        }
        data.courses = rst.courses;
      }).then(async () => {
        if (cont)
          await Course.find({ _id: { $in: data.courses } }, (er, da) => {
            data.courses = da;
            if (er) {
              return res.status(410).json({
                errors: "cours : " + err,
              });
            }
          }).then(async () => {
            await Student.findById(req.student.id, (erreur, donne) => {
              for (let i in data.courses) {
                if (courseExists(donne.finishedCourses, data.courses[i]._id)) {
                  data.finished.push(true);
                } else {
                  data.finished.push(false);
                }
              }
              for (let i in data.courses) {
                if (courseExists(donne.startedCourses, data.courses[i]._id)) {
                  data.started.push(true);
                } else {
                  data.started.push(false);
                }
              }
              return res.status(200).json(data);
            });
          });
      });
    }
  });
});
module.exports = router;
