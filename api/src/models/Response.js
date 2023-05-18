const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Response",
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
