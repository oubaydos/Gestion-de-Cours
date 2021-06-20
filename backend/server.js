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
app.use("/allStudents", require("./routes/api/all/allStudents"));
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
app.use("/test", require("./routes/api/test"));
//test add course
app.use("/addPic", require("./routes/api/add/addPic"));
app.use(
  "/getNumberOfChapters",
  require("./routes/api/courseDesc/getNumberOfChapters")
);
app.use(
  "/getNumberOfCourses",
  require("./routes/api/courseDesc/getNumberOfCourses")
);
app.use("/startCourse", require("./routes/api/start/startCourse"));
app.use("/startFormation", require("./routes/api/start/startFormation"));
app.use("/finishCourse", require("./routes/api/finish/finishCourse"));
app.use("/getChapters", require("./routes/api/courseDesc/getChapters"));
app.use("/setCurrentChapter", require("./routes/api/start/setCurrentChapter"));
app.use("/getCurrentChapter", require("./routes/api/start/getCurrentChapter"));
app.use("/addFormation", require("./routes/api/add/addFormation"));
app.use("/FillFormation", require("./routes/api/add/FillFormation"));
app.use("/getMark", require("./routes/api/courseDesc/getMark"));
app.use("/setMark", require("./routes/api/finish/setMark"));
app.use("/unenrollCourse", require("./routes/api/unenroll/course"));
app.use("/unenrollFormation", require("./routes/api/unenroll/formation"));
app.use("/getCurrentCourse", require("./routes/api/finish/getCurrentCourse"));
app.use("/setMarkFormation", require("./routes/api/finish/setMarkFormation"));
app.use("/hasRatedFormation", require("./routes/api/finish/hasRatedFormation"));
app.use(
  "/getCourseStudents",
  require("./routes/api/monitoring/getCourseStudents")
);
app.use("/setTestMark", require("./routes/api/monitoring/setMark"));
app.use("/admin/auth", require("./routes/api/admin/auth"));
app.use("/admin/register", require("./routes/api/admin/users"));
app.use("/deleteCourse", require("./routes/api/delete/deleteCourse"));
app.use("/deleteFormation", require("./routes/api/delete/deleteFormation"));
app.use("/deleteStudent", require("./routes/api/delete/deleteStudent"));
app.use("/deleteProf", require("./routes/api/delete/deleteProf"));
app.use("/admin/changePassword", require("./routes/api/admin/changePassword"));

//test Pdf
