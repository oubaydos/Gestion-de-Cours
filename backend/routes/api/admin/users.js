//adding admins
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Admin = require("../../../models/Admin");

const jwt = require("jsonwebtoken");
router.post(
  "/",
  check("username", "username non valide").custom(async (value) => {
    let e = false;
    await Admin.findOne(
      {
        username: value,
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
    const { username, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(6);
      ///////////////////////////
      let admin = new Admin({
        username,
        password,
      });

      admin.password = await bcrypt.hash(password, salt);
      await admin.save();

      //token generation

      const payload = {
        admin: {
          id: admin.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 50400 },
        async (err, token) => {
          if (err) throw err;
          else {
            res.status(200).json({ token: token });
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
