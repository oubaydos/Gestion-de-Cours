const express = require("express");
const router = express.Router();
const path = require("path");

const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const Course = require("../../../models/Course");

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
let reqqqq;
router.post("/test", upload.single("file"), async (req, res) => {
  console.log(tempNameFile);
  Course.findByIdAndUpdate(
    req.body.id,
    { image: tempNameFile },
    { new: true },
    (err, data) => {
      if (err || !data) {
        return res.status(404).json({ msg: "bad course id - db problem" });
      } else return res.status(200).send("good to go");
    }
  );
});

router.get("/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
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
});
module.exports = router;
