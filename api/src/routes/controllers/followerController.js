const { Comment, Post, User, Follower } = require("../../db");
const {
  postModels,
  putModels,
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getFollower = async (req, res) => {
  try {
    const { name } = req.query;
    const follower = await Follower.findAll({
    })
    res.status(200).json(follower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getFollowerById = async (req, res) => {
  try {
    const { id } = req.query;
    const follower = await getModelsById(Follower, id);
    res.status(200).json(Follower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createFollower = async (req, res) => {
  try {
    const { follower_id, user_id,} = req.body;

    const follower = await postModels(Follower, {
      user_id: follower_id
    });

    const user = await User.findOne({
      where: {
        id: user_id
      }
    })

    await user.addFollower(follower);

    if (Follower) {
      res.status(200).send("Succesfully followed!");
    } else {
      res.status(400).send("User couldn't be followed");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFollower = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await deleteModels(Follower, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreFollower = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Follower, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFollower,
  getFollowerById,
  createFollower,
  deleteFollower,
  restoreFollower
};
