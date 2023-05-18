const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Repost",
    {
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
