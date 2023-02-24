-require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DATABASE_URL,
} = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Post, Comment, Follower, Like } = sequelize.models;

User.belongsToMany(Post, { through: 'User_Post' });

User.belongsToMany(Follower, { through: 'User_Follower' });

Post.belongsToMany(Like, { through: 'Post_Like' });

Post.belongsToMany(Comment, { through: 'Post_Comment' });

Comment.belongsToMany(Like, { through: 'Comment_Like' });

Comment.belongsTo(User, { foreignKey: 'user_id' });



module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};
