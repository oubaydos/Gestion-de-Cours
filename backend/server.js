require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const connectDB = require("./db");

//connectDB
connectDB();

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.listen(process.env.PORT_BACK || 5000, function () {
  console.log(`listening on ${process.env.PORT || 5000}`);
});
app.get("/", async (req, res) => {
  await require("./routes/api/testSendpdf")();
  res.send("got the get request");
});

//contactForm
//require("./routes/api/contact.js")(app);
app.use("/contact", require("./routes/api/contact"));
app.use("/users", require("./routes/api/users.js"));
app.use("/auth", require("./routes/api/auth.js")); //auth.js
app.use("/deleteAccount", require("./routes/api/deleteAccount.js")); //auth.js
app.use("/addCourse", require("./routes/api/addCourse"));
app.use("/addChapter", require("./routes/api/addChapter"));
app.use("/allCourses", require("./routes/api/allCourses"));

//test Pdf
