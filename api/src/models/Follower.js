const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Post_Like",
    {
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      }
    }
  );
};
