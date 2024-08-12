// src/app.js
const express = require("express");
const routes = require("./routes");
const { connectDB } = require("./config/db_config");
const cors = require("cors");

const app = express();

connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Middleware to enable CORS
app.use(cors());

// Mounting the routes
app.use("/api/v1/", routes);

// Export the app
module.exports = app;
