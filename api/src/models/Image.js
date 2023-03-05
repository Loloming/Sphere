const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Image",
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
