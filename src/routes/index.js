const express = require("express");
const authRoutes = require("./authentication");
const accountRoutes = require("./accounts");
const companyRoutes = require("./company");
const userRoutes = require("./users");
const router = express.Router();

// Combine all the route groups
router.use("/", authRoutes);
router.use("/accounts", accountRoutes);
router.use("/companies", companyRoutes);
router.use("/users", userRoutes);

// Export the combined router
module.exports = router;
