const express = require("express");
const { registerHandler, loginHandler } = require("../handlers/auth");
const { authorizeRole } = require("../middleware/role");
const { loginValidationRules, validate } = require("../utils/validation");

const router = express.Router();

// Apply validation middleware to the /login endpoint
router.post("/login", loginValidationRules(), validate, loginHandler);

module.exports = router;
