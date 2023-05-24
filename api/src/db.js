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

const { User, Post, Comment, Follow, Like, Image, Video, Audio, Chat, Message, Reply, Repost, Sharing } = sequelize.models;



User.hasMany(Follow, { foreignKey: 'followerId', as: 'following' });
User.hasMany(Follow, { foreignKey: 'followingId', as: 'followers' });
User.hasMany(Message);
User.hasMany(Post);
User.belongsToMany(Chat, { through: 'User_Chat' });

Post.belongsToMany(Like, { through: 'Post_Like', onDelete: 'cascade'});
Post.belongsToMany(Image, { through: 'Post_Image', onDelete: 'cascade'});
Post.belongsToMany(Video, { through: 'Post_Video', onDelete: 'cascade'});
Post.belongsToMany(Repost, { through: 'Post_Repost', onDelete: 'cascade'});
Post.hasOne(Audio, { onDelete: 'cascade' });
Post.hasOne(Sharing, { onDelete: 'cascade' });
Post.belongsToMany(Comment, { through: 'Post_Comment', onDelete: 'cascade'});
Post.belongsTo(User);

Comment.belongsToMany(Like, { through: 'Comment_Like', onDelete: 'cascade'});
Comment.belongsToMany(Image, { through: 'Comment_Image', onDelete: 'cascade'});
Comment.belongsToMany(Reply, { through: 'Comment_Reply', onDelete: 'cascade'});
Comment.hasOne(Video, { onDelete: 'cascade' });
Comment.hasOne(Audio, { onDelete: 'cascade' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Message.belongsToMany(Image, { through: 'Message_Image', onDelete: 'cascade'});
Message.hasOne(Video, { onDelete: 'cascade' });
Message.hasOne(Audio, { onDelete: 'cascade' });

Chat.hasMany(Message);
Chat.belongsToMany(User, { through: 'User_Chat' });

Reply.belongsToMany(Like, { through: 'Reply_Like', onDelete: 'cascade'});
Reply.belongsToMany(Image, { through: 'Reply_Image', onDelete: 'cascade'});
Reply.hasOne(Video, { onDelete: 'cascade' });
Reply.hasOne(Audio, { onDelete: 'cascade' });
Reply.belongsTo(User, { foreignKey: 'user_id' });

Repost.belongsToMany(Post, { through: 'Post_Repost', onDelete: 'cascade'});
Repost.belongsTo(Post, {foreignKey: 'sharingPost_id'});
Repost.belongsTo(User, {foreignKey: 'user_id'});

Sharing.belongsTo(Post, {foreignKey: 'sharing_id'});

module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};
