const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(50),
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
      banner: {
        type: DataTypes.STRING,
        defaultValue: "https://blogs.iadb.org/conocimiento-abierto/wp-content/uploads/sites/10/2019/06/banner-programacion-creativa-p5js.png"
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: 'Hi there! I am using VoiceHub',
        allowNull: false,
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
