const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Course = require("../../../models/Course");
const Certificate = require("../../../models/Certificate");
const Prof = require("../../../models/Prof");
const Student = require("../../../models/Student");
const mongoose = require("mongoose");
let error;
let temp = [];
router.post("/", auth, async (req, res) => {
  let id = null;

  try {
    let error1 = null,
      error2 = null;
    error = null;
    console.log(req.user + req.student + req.prof);
    if (req.admin || !req.prof) {
      return res.status(400).json({ msg: "vous n'etes pas autorise" });
    }
    Student.findOne({ email: req.body.email }, (e, data) => {
      if (e || !data) {
        return (error1 = e);
      }
      temp = data.finishedCourses;
      id = data._id;
      for (let i of temp) {
        if (i.course === req.body.id) {
          i.mark = req.body.mark;
          return;
        }
      }
      error1 = "not finished";
      //res.send({ students: temp });
    }).then(async () => {
      await Student.findOneAndUpdate(
        { email: req.body.email },
        { finishedCourses: temp }
      ).then(async () => {
        let certificate = new Certificate({
          studentId: id,
          courseId: req.body.id,
        });
        await certificate.save();
        res.status(200).send("all is good");
      });
    });
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
