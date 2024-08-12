const express = require("express");
const { registerHandler, loginHandler } = require("../handlers/auth");
const { authorizeRole } = require("../middleware/role");

const router = express.Router();

// TODO: Add role check middleware

// Route for user registration
router.post("/register", registerHandler).post("/login", loginHandler);

module.exports = router;
