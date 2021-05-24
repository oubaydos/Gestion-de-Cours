require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"]; //get token
  if (!token) {
    res.status(401).json({ msg: "no token given" }); //401 == auth
  }
  //verify
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("req body : ", decoded);

    req.student = decoded.student;
    req.prof = decoded.prof;
    next();
  } catch (e) {
    res.status(401).json({ msg: "token invalid" });
  }
};
