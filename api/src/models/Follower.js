const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Follower",
    {
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      }
    }
  );
};
