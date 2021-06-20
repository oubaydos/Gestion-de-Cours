const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");
const Admin = require("../../../models/Admin");
let error;
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    //console.log(req.user + req.student + req.prof);
    if (req.admin) {
      if (!error1 && !error2 && !error) {
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
