const { Message, Chat, Image, Audio, Video } = require("../../db");
const {
  getModels,
  getModelsById,
  postModels,
  putModels,
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getMessage = async (req, res) => {
  try {
    const message = await Message.findAll({
      include: [
        {
          model: Image
        },
        {
          model: Audio
        },
        {
          model: Video
        }
      ]
    })
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
0

const getMessageById = async (req, res) => {
  try {
    const { id } = req.query;
    const message = await Message.findOne({
      where: {
        id: id
      },
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
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const { content, images, video, audio, user_id, chat_id } = req.body;

    const message = await postModels(Message, {
      user_id,
      content
    });

    if (images) {
      images.map(async i => {
        console.log(i.url)
        const image = await Image.create({
          url: i.url
        })
        await message.addImage(image)
      });
    };
    if (video) {
        const video_ = await Video.create({
          url: video
        })
        await message.addVideo(video_);
    };
    if (audio) {
      const audio_ = await Audio.create({
        url: audio
      })
      await message.setAudio(audio_)
    };

    const chat = await Chat.findOne({
      where: {
        id: chat_id
      }
    })

    await chat.addMessage(message);

    if (message) {
      res.status(200).send("Succesfully posted!");
    } else {
      res.status(400).send("Message couldn't be posted");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putMessage = async (req, res) => {
  try {
    const { id, properties } = req.body;
    const result = await putModels(Message, id, properties);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(Message, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreMessage = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Message, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMessage,
  getMessageById,
  createMessage,
  putMessage,
  deleteMessage,
  restoreMessage
};
