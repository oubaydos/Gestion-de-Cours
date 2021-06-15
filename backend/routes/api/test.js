const express = require("express");
const router = express.Router();
let a;
router.post("/", async (req, res) => {
  a = req;
  console.log(a);
  res.status(200).send(req.hello);
});
router.get("/", (req, res) => {
  res.send(a);
});
module.exports = router;
