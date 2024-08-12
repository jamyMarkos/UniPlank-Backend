// Model for UserSession
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db_config");

const UserSession = sequelize.define(
  "UserSession",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSession;
