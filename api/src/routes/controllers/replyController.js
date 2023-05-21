const { Reply, Post, Comment, User, Message, Video, Audio, Image } = require("../../db");
const {
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getReply = async (req, res) => {
  try {
    const response = await Reply.findAll({
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


const getReplyById = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await Reply.findOne({
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

const createReply = async (req, res) => {
  try {
    const { comment_id, user_id, content } = req.body;

    console.log(comment_id, user_id, content)

    const reply = await Reply.create({
      CommentId: comment_id,
      user_id,
      content
    });

    const comment = await Comment.findOne({
      where: {
        id: comment_id
      }
    });

    const user = await User.findOne({
      where: {
        id: user_id
      }
    });

    await comment.addReply(reply);
    // await reply.addUser(user);

    if (reply) {
      res.status(200).json(reply);
    } else {
      res.status(400).send("Response couldn't be posted");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(Reply, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreReply = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Reply, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getReply,
  getReplyById,
  createReply,
  deleteReply,
  restoreReply
};
