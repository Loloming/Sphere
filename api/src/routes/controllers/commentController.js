const { Comment, Post, Like, Image, Audio, Video } = require("../../db");
const {
  getModels,
  getModelsById,
  postModels,
  putModels,
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getComment = async (req, res) => {
  try {
    const { content } = req.query;
    const comment = await Comment.findAll({
      include: [
        {
          model: Like
        }
      ]
    })
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getCommentById = async (req, res) => {
  try {
    const { id } = req.query;
    const comment = await getModelsById(Comment, id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { content, images, video, audio, user_id, post_id } = req.body;

    const comment = await postModels(Comment, {
      user_id,
      content
    });

    if (images) {
      images.map(async i => {
        console.log(i.url)
        const image = await Image.create({
          url: i.url
        })
        await comment.addImage(image)
      });
    };
    if (video) {
        const video_ = await Video.create({
          url: video
        })
        await comment.addVideo(video_);
    };
    if (audio) {
      const audio_ = await Audio.create({
        url: audio
      })
      await comment.setAudio(audio_)
    };

    const post = await Post.findOne({
      where: {
        id: post_id
      }
    })

    await post.addComment(comment);

    if (comment) {
      res.status(200).send("Succesfully posted!");
    } else {
      res.status(400).send("Comment couldn't be posted");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putComment = async (req, res) => {
  try {
    const { id, properties } = req.body;
    const result = await putModels(Comment, id, properties);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(Comment, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreComment = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Comment, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getComment,
  getCommentById,
  createComment,
  putComment,
  deleteComment,
  restoreComment
};
