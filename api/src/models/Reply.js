const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Reply",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
