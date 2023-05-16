const { Like, Comment, Post, User } = require("../../db");
const bcryptjs = require("bcryptjs");
const {
  postModels,
  putModels,
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getLike = async (req, res) => {
  try {
    const { content } = req.query;
    const like = await getModels(Like, content);
    res.status(200).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getLikeById = async (req, res) => {
  try {
    const { id } = req.query;
    const like = await getModelsById(Like, id);
    res.status(200).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createLike = async (req, res) => {
  try {
    const { user_id, post_id, comment_id } = req.body;

    const like = await postModels(Like, {
      user_id
    });

    if (post_id) {
      const post = await Post.findOne({
        where: {
          id: post_id
        }
      })
      await post.addLike(like);
    }
    else if (comment_id) {
      const comment = await Comment.findOne({
        where: {
          id: comment_id
        }
      })
      await comment.addLike(like);
    }

    if (like) {
      post_id ? res.status(200).send("Post succesfully liked!") : res.status(200).send("Comment succesfully liked!");
    } else {
      res.status(400).send("Couldn't like");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putLike = async (req, res) => {
  try {
    const { id, properties } = req.body;
    const result = await putModels(Like, id, properties);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Like.destroy({
      where: {
        id
      }
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreLike = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Like, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getLike,
  getLikeById,
  createLike,
  putLike,
  deleteLike,
  restoreLike
};
