const {
  GetCompanies,
  GetCompany,
  CreateCompany,
  UpdateCompany,
} = require("../handlers/company");
const { authenticateJWT } = require("../middleware/auth");
const { authorizeRole } = require("../middleware/role");
const {
  createCompanyValidationRules,
  validate,
  updateCompanyValidationRules,
} = require("../utils/validation");

const router = require("express").Router();

router.use(authenticateJWT);

router
  .get("/", authorizeRole(["super_admin"]), GetCompanies)
  .get("/:id", authorizeRole(["super_admin"]), GetCompany)
  .post(
    "/",
    authorizeRole(["super_admin"]),
    createCompanyValidationRules(),
    validate,
    CreateCompany
  )
  .patch(
    "/:id",
    authorizeRole(["super_admin"]),
    updateCompanyValidationRules(),
    validate,
    UpdateCompany
  );

module.exports = router;
