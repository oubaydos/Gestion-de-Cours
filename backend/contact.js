//require needed libraries
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
//create instance of express
const app = express();

//use the main folder as a static folder so that we can access the css, images,audio files...
app.use(express.static(__dirname));
//set app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//set app to listen on port 5000
app.listen(process.env.PORT_BACK || 5000, function () {
  console.log(`listening on ${process.env.PORT || 5000}`);
});

//finally work after the post request
app.post("/contact", async function (req, res) {
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
  });

  await transport.sendMail({
    from: text.email,
    to: "oubayda56@gmail.com",
    subject: "Contact Form - New Email",
    html: `<h2>prenom : ${text.firstName} </h2><h2>nom ${text.lastName}</h2><h3>${text.message}</h3>`,
  });
});
