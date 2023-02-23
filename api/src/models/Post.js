const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Post",
    {
      media: {
        type: DataTypes.STRING,
        allowNull: true
      },
      heading: {
        type: DataTypes.STRING,
        allowNull: true
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
