const { Chat, User, Message, Video, Audio, Image } = require("../../db");
const {
  getModels,
  getModelsById,
  postModels,
  putModels,
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getChat = async (req, res) => {
  try {
    const { content } = req.query;
    const chat = await Chat.findAll();
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getChatById = async (req, res) => {
  try {
    const { id } = req.query;
    const chat = await Chat.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Message,
          include: [
            {
              model: Audio
            },
            {
              model: Video
            },
            {
              model: Image
            }
          ]
        }
      ]
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createChat = async (req, res) => {
  try {
    const { users, name } = req.body;

    const chat = await Chat.create({
      name
    });

    if (users) {
      users.map(async u => {
        const user = await User.findOne({
          where: {
            id: u.id
          }
        })
        await user.addChat(chat)
      });
    };

    if (chat) {
      res.status(200).send("Succesfully created!");
    } else {
      res.status(400).send("Chat couldn't be posted");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addUsers = async (req, res) => {
  try {
    const { users, chat_id } = req.body;

    const chat = await Chat.findOne({
      where: {
        id: chat_id
      }
    });

    if (chat) {
      users.map(async u => {
        await chat.addUser(u.id);
      })
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(Chat, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreChat = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Chat, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getChat,
  getChatById,
  createChat,
  addUsers,
  deleteChat,
  restoreChat
};
