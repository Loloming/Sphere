const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Video",
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
