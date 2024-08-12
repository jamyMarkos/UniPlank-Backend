require("dotenv").config();
const { Sequelize } = require("sequelize");

const DATABASE = process.env.POSTGRES_DB;
const USER = process.env.POSTGRES_USER;
const PASSWORD = process.env.POSTGRES_PASSWORD;
const HOST = process.env.POSTGRES_HOST;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  dialect: "postgres",
  logging: false, // Disable logging; default: console.log
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB };
