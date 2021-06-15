const express = require("express");
const router = express.Router();
const path = require("path");

const Chapter = require("../../../models/Chapter");
const Course = require("../../../models/Course");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const mongoURI = "mongodb://localhost:27017/PFA";

let i = 0;

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

router.post("/", upload.single("file"), async (req, res) => {
  let err = null;
  Course.findOneAndUpdate(
    { _id: req.body.id },
    { $addToSet: { Chapters: tempNameFile } },
    (e, data) => {
      if (e || !data) return (err = e + "erreur de cours");
    }
  );
  console.log(tempNameFile);
  if (err) return res.status(404).json({ msg: err });
  return res.send("good to go");
});

router.get("/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});
module.exports = router;
