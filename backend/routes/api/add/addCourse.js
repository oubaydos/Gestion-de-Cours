const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");
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
    let course = new Course({
      title: req.body.title,
      description: req.body.description,
      numberOfChapters: req.body.numberOfChapters,
      instructor: req.prof.id,
      type: req.body.type,
      quiz: req.body.quiz,
    });
    console.log("course");
    await course.save((err) => {
      if (err) return (error1 = err);
    });
    await Prof.findOneAndUpdate(
      { _id: req.prof.id },
      {
        $addToSet: {
          courses: course._id,
        },
      },
      (err, data) => {
        if (err) return (error2 = err);
      }
    );
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
