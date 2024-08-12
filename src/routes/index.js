const express = require("express");
const authRoutes = require("./authentication");
const router = express.Router();

// Combine all the route groups
router.use("/", authRoutes);

// Export the combined router
module.exports = router;
