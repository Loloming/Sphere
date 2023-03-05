const { Post, User, Comment, Like, Image, Video, Audio } = require("../../db");
const bcryptjs = require("bcryptjs");
const {
  postModels,
  putModels,
  deleteModels,
  restoreModels,
} = require("../utils/mainUtils");

const getPost = async (req, res) => {
  try {
    const { heading } = req.query;
    const posts = heading ? await Post.findAll({
      where: {
        heading
      }
    }) : await Post.findAll({
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
            }
          ]
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
      ]
    })
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getPostById = async (req, res) => {
  try {
    const { id } = req.query;
    const post = await getModelsById(Post, id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { images, videos, audio, content, user_id } = req.body;
    const post = await Post.create({
      content,
      UserId: user_id
    });
    if (images) {
      images.map(async i => {
        const image = await Image.create({
          url: i.url
        })
        await post.addImage(image)
      });
    };
    if (videos) {
      videos.map(async v => {
        const video = await Video.create({
          url: v.url
        })
        await post.addVideo(video)
      });
    };
    if (audio) {
      const audio_ = await Audio.create({
        url: audio
      })
      await post.setAudio(audio_)
    };
    if (post) {
      res.status(200).send("Succesfully posted!");
    } else {
      res.status(400).send("Post couldn't be created");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putPost = async (req, res) => {
  try {
    const { id, properties } = req.body;
    const result = await putModels(Post, id, properties);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(Post, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restorePost = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Post, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPost,
  getPostById,
  createPost,
  putPost,
  deletePost,
  restorePost
};
