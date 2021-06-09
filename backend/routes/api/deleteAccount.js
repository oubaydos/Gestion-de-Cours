const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Student = require("../../models/Student");
const Prof = require("../../models/Prof");

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.delete("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null,
      error = null;
    console.log(req.user + req.student + req.prof);
    if (req.student)
      await Student.deleteOne({ _id: req.student.id }, (err, data) => {
        if (err) {
          console.log("err");
          error1 = err;
          return;
        }
        if (data) return res.status(200).send(data);
        else error1 = new Error("no data found");
      });
    else if (req.prof)
      await Prof.deleteOne({ _id: req.prof.id }, (err, data) => {
        if (err) {
          console.log("err");
          error2 = err;
          return;
        }
        if (data) return res.status(200).send(data);
      });
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur");
  }
});
module.exports = router;
