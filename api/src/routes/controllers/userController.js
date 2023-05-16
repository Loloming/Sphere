const { User, Chat, Follow, Image, Audio, Video, Post, Like, Comment, conn } = require("../../db");
const bcryptjs = require("bcryptjs");
const {
  getModels,
  getModelsById,
  postModels,
  putModels,
  deleteModels,
  restoreModels,
  getModelsByEmail,
} = require("../utils/mainUtils");
const { welcomeUser } = require("../../mails/mails");

const getUser = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({
      where: {
        username
      },
      include: [
        {
          model: Chat,
        },
        "following",
        "followers",
        {
          model: Post,
          include: [
            {
              model: Comment,
              attributes: ['id', 'content', 'user_id'],
              include: [
                {
                  model: Like
                },
                {
                  model: Image
                },
                {
                  model: Video
                },
                {
                  model: Audio
                },
                {
                  model: User
                }
              ]
            },
            {
              model:User
            },
            {
              model: Like
            },
            {
              model: Image
            },
            {
              model: Video
            },
            {
              model: Audio
            }
          ]
        }
      ]
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      username,
      name,
      lastname,
      email,
      password,
      profile_picture,
      is_private,
    } = req.body;
    if (!name || !email || !password) {
      res.status(401).json({
        response: "Missing data!",
      });
    } else {
      const passwordHash = await bcryptjs.hash(password, 8);
      const user = await postModels(User, {
        username,
        name,
        lastname,
        email,
        password: passwordHash,
        profile_picture,
        is_private,
      });
      if (user) {
        res.status(200).json({
          response: "User registered!",
        });
        // welcomeUser(name, mail);
      } else {
        res.status(401).json({
          response: "User couldn't be created",
        });
      }
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findAll({
      where: {
        email,
      },
      include: [
        {
          model: Chat,
        },
        "following",
        "followers",
        {
          model: Post,
          include: {
            model: Like
          },
        }
      ]
    });

    if (user[0]) {
      const compare = await bcryptjs.compare(password, user[0].password);
      if (compare) {
        res.status(200).json({
          user: user[0],
          response: "User logged!",
        });
      } else {
        res.status(401).json({
          response: "Wrong password!",
        });
      }
    } else {
      res.status(401).json({
        response: "Email doesn't exist!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const putUser = async (req, res) => {
  try {
    const { id, properties } = req.body;
    const result = await putModels(User, id, properties);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(User, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreUser = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(User, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  getUserById,
  getUserByUsername,
  registerUser,
  loginUser,
  putUser,
  deleteUser,
  restoreUser,
};
