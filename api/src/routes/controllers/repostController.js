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

// Se crea un post compartiendo otro. El post que comparte tiene la propiedad "Sharing"
// Al crearse ese post, tenemos que agregarle su ID a la propiedad "Reposts" del post que
// está siendo compartido
// post_id sería el post que comparte
// sharing_id sería el post que está compartiendo
// user_id es el user que lo comparte


const createRepost = async (req, res) => {
  try {
    const { post_id, sharing_id, user_id } = req.body;

    console.log(post_id, user_id)

    // Se crea el repost con el id del user y del post que comparte

    const repost = await Repost.create({
      sharingPost_id: post_id, // Cambiar el nombre de la propiedad a "sharingPost_id"
      user_id
    });

    // Se busca el post que está siendo compartido para agregarle el repost

    const post = await Post.findOne({
      where: {
        id: sharing_id
      }
    })

    await post.addRepost(repost); // Se añade
    
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
