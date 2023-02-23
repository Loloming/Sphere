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

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Post, Comment, Follower, Like } = sequelize.models;
// Aca vendrian las relaciones
User.belongsToMany(Post, { through: 'User_Post' });
// Post.hasOne(User, { foreignKey: 'user_id' });

User.belongsToMany(Follower, { through: 'User_Follower' });
Follower.belongsTo(User);

Post.belongsToMany(Like, { through: 'Post_Like' });
Like.belongsTo(Post, { foreignKey: 'post_id' });

Comment.belongsToMany(Like, { through: 'Comment_Like' });
Like.belongsTo(Comment, { foreignKey: 'comment_id' });

Post.belongsToMany(Comment, { through: 'Post_Comment' });
Comment.belongsTo(Post, { foreignKey: 'user_id' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
