const nodemailer = require("nodemailer");

async function sendMessage(token, email, isStudent = true) {
  console.log("wslna bach nsifto");
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
  const link = `localhost:${
    process.env.PORT_BACK || 5000
  }/users/confirmation/${token}?isStudent=${isStudent}`;
  await mailTransporter.sendMail({
    from: "bouifadene1@gmail.com",
    to: `${email}`,
    subject: `Gestion de cours - verifier votre email`,
    html: `<h4>svp verifier votre email : <h4/><a href="http://127.0.0.1:5000/users/confirmation/${token}?isStudent=${isStudent}">cliquer ici</a> : ${link} <p>si vous n'avez pas inscrire, ne cliquer pas</p><p>si le boutton ne fonctionne pas, veuillez copier le lien </p>`,
  });
}
module.exports = sendMessage;
