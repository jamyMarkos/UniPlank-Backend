"use strict";

const User = require("../src/models/User");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", User.getAttributes());
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
