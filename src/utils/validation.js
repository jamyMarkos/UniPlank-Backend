const { body, validationResult, param } = require("express-validator");

// Define validation rules for the login route
const loginValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .notEmpty()
      .withMessage("Email is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

// Validation rules for user registration
const registerUserValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isAlpha()
      .withMessage("First name must only contain letters"),

    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .isAlpha()
      .withMessage("Last name must only contain letters"),

    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .notEmpty()
      .withMessage("Email is required"),

    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(["admin", "team_member", "worker"])
      .withMessage("Invalid role provided"),
  ];
};

// Validation rules for customer registration
const registerCustomerValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isAlpha()
      .withMessage("First name must only contain letters"),

    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .isAlpha()
      .withMessage("Last name must only contain letters"),

    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .notEmpty()
      .withMessage("Email is required"),

    body("companyID")
      .notEmpty()
      .withMessage("Company ID is required")
      .isNumeric()
      .withMessage("Company ID must be a number"),

    body("position").notEmpty().withMessage("Position is required"),

    body("city").notEmpty().withMessage("City is required"),

    body("country").notEmpty().withMessage("Country is required"),

    body("state").notEmpty().withMessage("State is required"),

    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone()
      .withMessage("Invalid phone number format"),
  ];
};

// Validation rules for creating a company
const createCompanyValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Company name is required")
      .isLength({ min: 2, max: 100 })
      .withMessage("Company name must be between 2 and 100 characters long"),
  ];
};

// Validate rules for updating a company
const updateCompanyValidationRules = () => {
  return [
    param("id").isNumeric().withMessage("Company ID must be a numeric value"),

    body("name")
      .notEmpty()
      .withMessage("Company name is required")
      .isLength({ min: 2, max: 100 })
      .withMessage("Company name must be between 2 and 100 characters long"),
  ];
};

// Utility function to handle validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  loginValidationRules,
  registerUserValidationRules,
  registerCustomerValidationRules,
  createCompanyValidationRules,
  updateCompanyValidationRules,

  validate,
};
