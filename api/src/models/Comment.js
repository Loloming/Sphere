const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comment",
    {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      post_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      media: {
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
  );
};
