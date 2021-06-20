const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Admin = require("../../../models/Admin");

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null,
      error = null;
    if (req.admin)
      await Admin.findOne({ _id: req.admin.id }, (err, data) => {
        if (err) {
          console.log("err");
          error1 = err;
          return;
        }
        if (data) return res.status(200).send(data);
        else error1 = new Error("no data found");
      });

    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur");
  }
});
router.post(
  "/",
  check("username", "nom d'utilisateur non valide").custom(
    async (value, { req }) => {
      let e = false;
      await Admin.findOne(
        {
          username: value,
        },
        async (err, data) => {
          if (data === null) {
            console.log("\n\n\n" + data + "\n\n\n");
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
    }
  ),
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
      const admin = await Admin.findOne({ username });
      const payload = {
        admin: {
          id: admin.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 50400 },
        (err, token) => {
          if (err) throw err;
          else {
            res.status(200).send({ token: token });
          }
        }
      );
    } catch (e) {
      console.log("un erreur : ", e.message);

      res.status(500).send("erreur de serveur");
    }
  }
);
module.exports = router;
