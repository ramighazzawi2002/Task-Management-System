const jwt = require("jsonwebtoken");
const JWT_SECRET = "JSJGHJSNAIFUWQUEU";
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json("Access denied");
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json("Invalid token");
  }
};

module.exports = verifyToken;
