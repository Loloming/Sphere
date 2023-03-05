const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Follow",
    {
      followerId: {
        type: DataTypes.INTEGER,
        unique: 'F1',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      followingId: {
        type: DataTypes.INTEGER,
        unique: 'F1',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    }
  );
};
