const jwt = require("jsonwebtoken");
const secret = "lkasjflsajflsaf";

module.exports = (req, res, next) => {
  try {
    const token = req.cookies;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth Failed" });
  }
};
