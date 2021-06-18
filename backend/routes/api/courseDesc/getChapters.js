const express = require("express");
const router = express.Router();
const Course = require("../../../models/Course");
const path = require("path");

const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const mongoURI = "mongodb://localhost:27017/PFA";
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
let tempNameFile;
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        tempNameFile = filename;
        console.log(tempNameFile);
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
router.post("/", async (req, res) => {
  //res.send(req.body.id);
  await Course.findById(req.body.id, async (err, rst) => {
    if (err || rst === null || rst === undefined)
      return res.status(410).json({
        errors: "courss : " + err,
      });
    else {
      return res.status(200).json({
        numberOfChapters: rst.numberOfChapters,
        Chapters: rst.Chapters,
        type: rst.type || "video",
      });
    }
  });
});
router.get("/:courseId/:num", async (req, res) => {
  if (req.params.courseId === "file") {
    gfs.files.findOne({ filename: req.params.num }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // Check if image
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
        // res.status(404).json({
        //   err: "Not an image",
        // });
      }
    });
  } else {
    await Course.findById(req.params.courseId, async (err, rst) => {
      if (err || rst === null || rst === undefined)
        return res.status(410).json({
          errors: "courss : " + err,
        });
      else {
        if (req.params.num >= rst.numberOfChapters)
          res.status(400).json({ msg: "chapitre non trouvé!" });
        else res.redirect(`/getChapters/file/${rst.Chapters[req.params.num]}`);
      }
    });
  }
});

module.exports = router;
