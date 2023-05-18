const { Repost, Post, User, Message, Video, Audio, Image } = require("../../db");
const {
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getRepost = async (req, res) => {
  try {
    const repost = await Repost.findAll({
      include: [
        {
          model: Post
        }
      ]
    });
    res.status(200).json(repost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getRepostById = async (req, res) => {
  try {
    const { id } = req.query;
    const repost = await Repost.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Post
        }
      ]
    });
    res.status(200).json(repost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRepost = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;

    const repost = await Repost.create({
      PostId: post_id,
      UserId: user_id
    });

    if (repost) {
      res.status(200).json(repost);
    } else {
      res.status(400).send("Repost couldn't be posted");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRepost = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(Repost, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreRepost = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Repost, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRepost,
  getRepostById,
  createRepost,
  deleteRepost,
  restoreRepost
};
