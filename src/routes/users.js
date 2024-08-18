const express = require("express");
const { updatePasswordHandler } = require("../handlers/users");
const { authenticateJWT } = require("../middleware/auth");
const {
  updatePasswordValidationRules,
  validate,
} = require("../utils/validation");

const router = express.Router();

router.use(authenticateJWT);

router.put(
  "/update-password",
  updatePasswordValidationRules(),
  validate,
  updatePasswordHandler
);

module.exports = router;
