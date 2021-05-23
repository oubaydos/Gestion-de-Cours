// work after the post request
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

console.log("contact js");
router.get("/", (req, res) => res.send("got the get"));
router.post("/", async function (req, res) {
  //wach hadchi s7i7 : /contact f router
  let { text } = req.body;
  text = JSON.parse(text);
  console.log(text);
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 25,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bouifadene1@gmail.com",
      pass: process.env.PERS_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  await mailTransporter.sendMail({
    from: "bouifadene1@gmail.com",
    to: "oubayda56@gmail.com",
    subject: `Contact Form - ${text.email}`,
    html: `<h2>prenom : ${text.firstName} </h2><h2>nom ${text.lastName}</h2><h3>${text.message}</h3>`,
  });
  await transport.sendMail({
    from: text.email,
    to: "oubayda56@gmail.com",
    subject: "Contact Form - New Email",
    html: `<h2>prenom : ${text.firstName} </h2><h2>nom ${text.lastName}</h2><h3>${text.message}</h3>`,
  });
});

module.exports = router;
