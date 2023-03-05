const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
  );
};
