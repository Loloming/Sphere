const { Response, Post, User, Message, Video, Audio, Image } = require("../../db");
const {
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getResponse = async (req, res) => {
  try {
    const response = await Response.findAll({
      include: [
        {
          model: Post
        }
      ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getResponseById = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await Response.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Post
        }
      ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createResponse = async (req, res) => {
  try {
    const { comment_id, user_id } = req.body;

    const response = await Response.create({
      CommentId: comment_id,
      UserId: user_id
    });

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).send("Response couldn't be posted");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteResponse = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(Response, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreResponse = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Response, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getResponse,
  getResponseById,
  createResponse,
  deleteResponse,
  restoreResponse
};
