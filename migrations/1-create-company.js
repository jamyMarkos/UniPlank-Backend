"use strict";

const Company = require("../src/models/Company");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Companies", Company.getAttributes());
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Companies");
  },
};
