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
app.use("/addCourse", require("./routes/api/add/addCourse"));
app.use("/addChapter", require("./routes/api/add/addChapter"));
app.use("/allCourses", require("./routes/api/all/allCourses"));
app.use("/allProfs", require("./routes/api/all/allProfs"));
app.use("/allFormations", require("./routes/api/all/allFormations"));
app.use("/addFormation", require("./routes/api/add/addFormation"));
app.use("/enrollCourse", require("./routes/api/enroll/enrollCourse"));
app.use("/enrollFormation", require("./routes/api/enroll/enrollFormation"));
app.use("/myCourses", require("./routes/api/my/myCourses"));
app.use("/myFormations", require("./routes/api/my/myFormations"));
app.use("/searchCourse", require("./routes/api/search/searchCourse"));
app.use("/searchFormation", require("./routes/api/search/searchFormation"));
app.use("/bestCourses", require("./routes/api/best/bestCourses"));
app.use("/getCourse", require("./routes/api/courseDesc/getCourse"));
app.use("/getFormation", require("./routes/api/courseDesc/getFormation"));
app.use("/myStartedCourses", require("./routes/api/my/myStartedCourses"));
app.use("/myStartedFormations", require("./routes/api/my/myStartedFormations"));
app.use(
  "/myFinishedFormations",
  require("./routes/api/my/myFinishedFormations")
);
app.use("/myFinishedCourses", require("./routes/api/my/myFinishedCourses"));
app.use("/isStudent", require("./routes/api/isStudent"));

//test Pdf
