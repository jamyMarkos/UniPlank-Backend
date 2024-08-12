// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] },
    });

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
