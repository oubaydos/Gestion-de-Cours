const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");
const Student = require("../../../models/Student");
const mongoose = require("mongoose");
let error;
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    console.log(req.user + req.student + req.prof);
    if (req.student || !req.prof) {
      return res.status(400).json({ msg: "vous n'etes pas autorise" });
    }
    Student.find({}, (e, data) => {
      if (e) {
        return (error1 = e);
      }
      let temp = [];
      let tempItem = {};
      data.forEach((item) => {
        console.log(item.enrolledCourses);
        for (let i of item.enrolledCourses) {
          if (i.course === req.body.id) {
            tempItem = {
              etudiant: item.firstName + " " + item.lastName,
              email: item.email,
              currentChapter: 0,
              started: false,
              finished: false,
              rated: false,
              mark: i.mark,
            };
            temp.push(tempItem);

            return;
          }
        }
        for (let i of item.startedCourses) {
          if (i.course === req.body.id) {
            tempItem = {
              etudiant: item.firstName + " " + item.lastName,
              email: item.email,
              currentChapter: i.currentChapter,
              started: true,
              finished: false,
              rated: false,
              mark: i.mark,
              startingTime: i.startingTime,
            };
            temp.push(tempItem);
            return;
          }
        }
        for (let i of item.finishedCourses) {
          if (i.course === req.body.id) {
            tempItem = {
              etudiant: item.firstName + " " + item.lastName,
              email: item.email,
              started: true,
              finished: true,
              rated: i.rated,
              mark: i.mark,
              startingTime: i.startingTime,
              finishingTime: i.finishingTime,
            };
            temp.push(tempItem);
            return;
          }
        }
      });
      res.send({ students: temp });
    });
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
