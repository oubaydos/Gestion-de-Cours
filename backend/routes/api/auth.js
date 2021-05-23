const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Student = require("../../models/Student");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/", auth, async (req, res) => {
  try {
    await Student.findOne({ _id: req.student.id }, (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  } catch (e) {
    console.log(e);
  }
});
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
    .custom(async (value) => {
      let e = false;
      await Student.findOne(
        {
          email: value,
        },
        (err, data) => {
          if (err || data === null) {
            e = true;
          }
        }
      );
      if (e) throw new Error("l'utilisateur n'est pas encore enregistré");
      return true;
    }),
  check("password", "le mot de passe est trop court (<6)")
    .isLength({
      min: 6,
    })
    .custom(async (value, { req }) => {
      let e = false;
      await Student.findOne(
        {
          email: req.body.email,
        },
        async (err, data) => {
          const isMatch = await bcrypt.compare(value, data.password);
          if (err || !isMatch) {
            //hadchi khat2 khask tzid bcrypt
            e = true;
          }
        }
      );
      if (e) throw new Error("mot de passe eroné");
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }
    const { email } = req.body;
    const student = await Student.findOne({ email: email }, (e, data) => {
      if (e) console.log(e);
    });
    try {
      const payload = {
        student: {
          id: student.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 50400 },
        (err, token) => {
          if (err) throw err;
          else {
            res.json({ token }); //200
          }
        }
      ); //2weeks
      //
    } catch (e) {
      console.log("un erreur : ", e.message);

      res.status(500).send("erreur de serveur");
    }
  }
);
module.exports = router;
