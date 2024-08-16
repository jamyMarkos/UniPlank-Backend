const express = require("express");
const { loginHandler } = require("../handlers/auth");
const { authorizeRole } = require("../middleware/role");
const {
  registerUsersHandler,
  registerAdminsHandler,
  registerCustomerHandler,
  getAllCustomersHandler,
  getCustomerHandler,
} = require("../handlers/accounts");
const { authenticateJWT } = require("../middleware/auth");
const {
  registerUserValidationRules,
  validate,
  registerCustomerValidationRules,
} = require("../utils/validation");

const router = express.Router();

router.use(authenticateJWT);

// Route for user registration
router
  .post(
    "/register-user",
    registerUserValidationRules(),
    validate,
    registerUsersHandler
  )
  .post(
    "/register-customer",
    authorizeRole(["super_admin"]),
    registerCustomerValidationRules(),
    validate,
    registerCustomerHandler
  )
  .get("/customers", authorizeRole(["super_admin"]), getAllCustomersHandler)
  .get("customers/:id", authorizeRole(["super_admin"]), getCustomerHandler);

module.exports = router;
