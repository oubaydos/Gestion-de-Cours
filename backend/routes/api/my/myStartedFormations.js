const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Prof = require("../../../models/Prof");

const Formation = require("../../../models/Formation");
let error;
let formationsIds = [];
let formations = [];
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
          for (let i of data.startedFormations) {
            formationsIds.push(i.formation);
          }
        });
      if (!error1 && !error2 && !error) {
        console.log(formationsIds);
        if (formationsIds.length === 0) res.status(200).send("[]");
        else
          formationsIds.forEach(async (i, index) => {
            await Formation.findById(i, async (err, data) => {
              console.log(data);

              if (err || !data) {
                error1 = err || "probleme dans les cours de cet etudiant";
                return;
              }
              await Prof.findById(data.instructor, (e, d) => {
                if (e || !d) {
                  error1 = err || "probleme dans le prof de ce cours";
                  return;
                }
                formations.push({
                  data: data,
                  teacher: d.firstName + " " + d.lastName,
                });
                if (index === formationsIds.length - 1) {
                  console.log("formations lasr ");
                  console.log(formations);
                  return res.status(200).json(formations);
                }
              });
            });
          });
      }
    } else if (req.prof) throw new Error("prof cant start formations");
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    return res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
