const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");
const Student = require("../../../models/Student");
const mongoose = require("mongoose");
let error;
let temp = [];
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    console.log(req.user + req.student + req.prof);
    if (req.student || !req.prof) {
      return res.status(400).json({ msg: "vous n'etes pas autorise" });
    }
    Student.findOne({ email: req.body.email }, (e, data) => {
      if (e || !data) {
        return (error1 = e);
      }
      temp = data.finishedCourses;
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
        { $set: { finishedCourses: temp } }
      ).then(() => {
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
