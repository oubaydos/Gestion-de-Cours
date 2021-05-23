//adding users
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
  check("firstName", "prenom est requis").notEmpty(),
  check("lastName", "nom est requis").notEmpty(),
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
    .custom(async (value) => {
      let e = false;
      await Student.findOne(
        {
          email: value,
        },
        (err, data) => {
          if (err || data !== null) {
            e = true;
          }
        }
      );
      await Prof.findOne(
        {
          email: value,
        },
        (err, data) => {
          if (err || data !== null) {
            e = true;
          }
        }
      );
      if (e) throw new Error("l'email est deja utilise");
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
    const { firstName, lastName, email, password, isStudent } = req.body;
    try {
      const salt = await bcrypt.genSalt(6);
      ///////////////////////////
      if (isStudent) {
        let student = new Student({
          firstName,
          lastName,
          email,
          password,
        });

        student.password = await bcrypt.hash(password, salt);
        await student.save();

        //token generation

        const payload = {
          student: {
            id: student.id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 50400 },
          async (err, token) => {
            if (err) throw err;
            else {
              console.log("9bl mandkhlo\n\n" + token + "\n");
              await require("./register")(token, email);
              res.status(200); //200
            }
          }
        ); //2weeks
        //
      } /////////////
      else {
        let prof = new Prof({
          firstName,
          lastName,
          email,
          password,
        });

        prof.password = await bcrypt.hash(password, salt);
        await prof.save();

        //token generation

        const payload = {
          prof: {
            id: prof.id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 50400 },
          async (err, token) => {
            if (err) throw err;
            else {
              console.log("9bl mandkhlo");
              await require("./register")(token, email, false);
              res.status(200); //200
            }
          }
        ); //2weeks
        //
      }
    } catch (e) {
      console.log("un erreur : ", e.message);

      res.status(500).send("erreur de serveur");
    }
  }
);
router.get(`/confirmation/:token`, async (req, res) => {
  let toBool = (string) => (string === "true" ? true : false);
  try {
    if (toBool(req.query.isStudent) === true) {
      console.log("ha7na hna");
      let { student } = jwt.verify(req.params.token, process.env.JWT_SECRET);
      let error = null;
      console.log("ha7na hna");
      let foundUser = await Student.findByIdAndUpdate(
        student.id,
        { active: true },
        (err, data) => {
          if (err) {
            error = err;
          } else {
            if (data === null || data === undefined) {
              error = new Error(
                "l'etudiant n'est pas trouvé, veuillez verifier le lien ou réinscrire"
              );
            }
          }
        }
      );
      if (error !== null) throw error;
      res.status(200).redirect("http://127.0.0.1:3000/signin");
    } else {
      /////mazal matraiitit hadchi
      let { prof } = jwt.verify(req.params.token, process.env.JWT_SECRET);
      let error = null;
      let foundUser = await Prof.findByIdAndUpdate(
        prof.id,
        { active: true },
        (err, data) => {
          if (err) {
            error = err;
          } else {
            if (data === null || data === undefined) {
              error = new Error(
                "le prof n'est pas trouvé, veuillez verifier le lien ou réinscrire"
              );
            }
          }
        }
      );
      if (error !== null) throw error;
      res.status(200).redirect("http://127.0.0.1:3000/signin");
    }
  } catch (e) {
    res.status(410).json({ errors: e });
  }
});
module.exports = router;
