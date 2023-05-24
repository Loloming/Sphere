const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sharing",
    {
      // sharingPost: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false
      // },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
