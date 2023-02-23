const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
