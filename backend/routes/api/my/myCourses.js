const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");

let error;
let coursesIds = [];
let courses = [];
let name;
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    //console.log(req.user + req.student + req.prof);
    if (req.student) {
      if (!error1 && !error2 && !error)
        await Student.findById(req.student.id, (err, data) => {
          coursesIds = [];
          courses = [];
          if (err || !data) {
            error1 = err + "erreur dans l'etudiant ";
            return;
          }
          for (let i of data.enrolledCourses) {
            coursesIds.push(i.course);
          }
        });

      if (!error1 && !error2 && !error) {
        console.log(coursesIds);
        if (coursesIds.length === 0) res.status(200).send("[]");
        else
          coursesIds.forEach(async (i, index) => {
            await Course.findById(i, (err, data) => {
              if (err || !data) {
                error1 = err || "probleme dans les cours de cet etudiant";
                return;
              }
              courses.push(data);
            });
            if (index === coursesIds.length - 1) {
              console.log("courses lasr ");
              console.log(courses);
              res.status(200).json(courses);
            }
          });
      }
    } else if (req.prof) {
      if (!error1 && !error2 && !error)
        await Prof.findById(req.prof.id, (err, data) => {
          coursesIds = [];
          courses = [];
          if (err || !data) {
            error1 = err + "erreur dans le prof ";
            return;
          }
          name = data.firstName + " " + data.lastName;
          coursesIds = data.courses;
        });

      if (!error1 && !error2 && !error) {
        console.log(coursesIds);
        if (coursesIds.length === 0) res.status(200).send("[]");
        else
          coursesIds.forEach(async (i, index) => {
            await Course.findById(i, (err, data) => {
              if (err || !data) {
                error1 = err || "probleme dans les cours de cet etudiant";
                return;
              }
              courses.push({ data, prof: name });
            });
            if (index === coursesIds.length - 1) {
              console.log(coursesIds);
              console.log("courses lasr ");
              console.log(courses);
              res.status(200).json(courses);
            }
          });
      }
      error1 === null ? (error = error2) : (error = error1);
      if (error) throw error;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
