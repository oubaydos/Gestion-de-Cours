require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Student = require("../../models/Student");
const Prof = require("../../models/Prof");

const jwt = require("jsonwebtoken");
// ...
router.post(
  "/",
  check("email", "email non valide")
    .isEmail()
    .custom((value) => {
      if (
        value.split("@")[1] === "um5.ac.ma" ||
        value.split("@")[1] === "um5r.ac.ma" ||
        value.split("@")[1] === "ensias.um5.ma"
      )
        return true;
      throw new Error("Email non valide : email doit etre @um5 ... ");
    })
    .custom(async (value, { req }) => {
      let e = false;
      await Student.findOne(
        {
          email: value,
        },
        async (err, data) => {
          if (data === null) {
            e = true;
            return;
          }
          let bool = await bcrypt.compare(req.body.password, data.password);
          console.log("\n\n\n" + bool + "\n\n\n");

          if (err || !bool) {
            e = true;
          }
        }
      );
      await Prof.findOne(
        {
          email: value,
        },
        async (err, data) => {
          if (data == null) {
            e = true;
            return;
          }
          let bool = await bcrypt.compare(req.body.password, data.password);

          if (err || !bool) {
            e = true;
          }
        }
      );
      if (e) throw new Error("erreur dans les credentielles");
      return true;
    }),
  check("password", "le mot de passe est trop court (<6)").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(410).json({
        errors: errors.array(),
      });
    }
    const { email, password, isStudent } = req.body;
    try {
      if (isStudent) {
      } /////////////
      else {
      }
    } catch (e) {
      console.log("un erreur : ", e.message);

      res.status(500).send("erreur de serveur");
    }
  }
);
module.exports = router;
