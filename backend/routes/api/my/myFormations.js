const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Formation = require("../../../models/Formation");
const Prof = require("../../../models/Prof");

let error;
let formationsIds = [];
let formations = [];
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
          formationsIds = [];
          formations = [];
          if (err || !data) {
            error1 = err + "erreur dans l'etudiant ";
            return;
          }
          for (let i of data.enrolledFormations) {
            formationsIds.push(i.formation);
          }
        });

      if (!error1 && !error2 && !error) {
        let breakOut = false;
        console.log(formationsIds);
        if (formationsIds.length === 0) res.status(200).send("[]");
        else
          formationsIds.forEach(async (i, index) => {
            if (breakOut) return;
            await Formation.findById(i, async (err, data) => {
              if (err || !data) {
                error1 = err || "probleme dans les cours de cet etudiant";
                breakOut = true;
                return;
              } else {
                await Prof.findById(data.instructor, (e, d) => {
                  if (e || !d) {
                    error1 = e || "pb dans le prof";
                    return (breakOut = true);
                  }
                  if (!e && d) {
                    formations.push({
                      data,
                      prof: d.firstName + " " + d.lastName,
                    });
                    if (index === formationsIds.length - 1) {
                      console.log("formations lasr ");
                      console.log(formations);
                      res.status(200).json(formations);
                    }
                  }
                });
              }
            });
          });
      }
    } else if (req.prof) {
      if (!error1 && !error2 && !error)
        await Prof.findById(req.prof.id, (err, data) => {
          formationsIds = [];
          formations = [];
          if (err || !data) {
            error1 = err + "erreur dans le prof ";
            return;
          }
          name = data.firstName + " " + data.lastName;
          formationsIds = data.formations;
        });

      if (!error1 && !error2 && !error) {
        console.log(formationsIds);
        if (formationsIds.length === 0) res.status(200).send("[]");
        else
          formationsIds.forEach(async (i, index) => {
            await Formation.findById(i, (err, data) => {
              if (err || !data) {
                error1 = err || "probleme dans les cours de cet etudiant";
                return;
              }
              formations.push({ data, prof: name });
            });
            if (index === formationsIds.length - 1) {
              console.log(formationsIds);
              console.log("formations lasr ");
              console.log(formations);
              res.status(200).json(formations);
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
