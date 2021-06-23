const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Formation = require("../../../models/Formation");
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");
const mongoose = require("mongoose");
let error;
let breakOut = false;
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    console.log(req.user + req.student + req.prof);
    if (req.student || !req.prof) {
      return res.status(400).json({ msg: "vous n'etes pas autorise" });
    }

    await Prof.findById(
      req.prof.id,

      (err, data) => {
        console.log(data.formations);
        if (err || !data || !data.formations.includes(req.body.id))
          return (error2 = err || "auth error");
      }
    ).then(async () => {
      if (!error2 && !error1) {
        breakOut = false;
        let arr = req.body.courses;
        console.log("arr");
        console.log(arr);
        arr.forEach(async (i, index) => {
          console.log("break out : ", breakOut, index);
          if (breakOut) return;
          await Course.findById(i, async (e, donne) => {
            if (e || !donne) {
              console.log("hhhhhhhhhhhgggggghhhhh");
              breakOut = true;
              return (error2 = e || "l'un des ids données est erroné");
            }
            if (index === arr.length - 1) {
              if (!error2 && !error1) {
                console.log("erreur 2 : ", error2);
                Formation.findOneAndUpdate(
                  { _id: req.body.id },
                  { courses: req.body.courses },
                  (err, data) => {
                    if (err || !data)
                      return (error2 = err || "no formation found");
                    else return res.send("all is good");
                  }
                );
              }
            }
          });
        });
      }
    });

    error1 === null ? (error = error2) : (error = error1);
    if (error || breakOut) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
