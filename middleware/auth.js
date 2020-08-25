const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // if there is a token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); // get payload from token

    req.user = decoded.user;
    next(); // morš klicat - pravilo
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
