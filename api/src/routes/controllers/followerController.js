const { Comment, Post, User, Follow } = require("../../db");
const {
  postModels,
  putModels,
  deleteModels,
  restoreModels
} = require("../utils/mainUtils");

const getFollower = async (req, res) => {
  try {
    const follower = await Follow.findAll({
    })
    res.status(200).json(follower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getFollowersById = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id)
    const follower = await Follow.findAll({
      where: {
        followingId: id
      },
      include:
        {
          model: User,
          attributes: ['username'],
          as: 'follower'
        }
    });

    const response = {
      quantity: follower.length,
      followers: follower.map(f => {
        return {
          follow_id: f.id,
          username: f.follower.username,
          user_id: f.followerId
        }
      })
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFollowingById = async (req, res) => {
  try {
    const { id } = req.query;

    const follower = await Follow.findAll({
      where: {
        followerId: id
      },
      include:
        {
          model: User,
          attributes: ['username'],
          as: 'following'
        }
    });

    const response = {
      quantity: follower.length,
      following: follower.map(f => {
        return {
          follow_id: f.id,
          username: f.following.username,
          user_id: f.followingId
        }
      })
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createFollower = async (req, res) => {
  try {
    const { follower_id, user_id,} = req.body;

    const follower = await postModels(Follow, {
      followerId: follower_id,
      followingId: user_id
    });

    if (follower) {
      res.status(200).send("Succesfully followed!");
    } else {
      res.status(400).send("User couldn't be followed");
    }

  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const deleteFollower = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id)
    const updated = await Follow.destroy({
      where: {
        id
      }
    });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error)
    // res.status(400).json({ error: error.message });
  }
};

const restoreFollower = async (req, res) => {
  try {
    const { id } = req.body;
    const restored = await restoreModels(Follow, id);
    res.status(200).json(restored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFollower,
  getFollowersById,
  getFollowingById,
  createFollower,
  deleteFollower,
  restoreFollower
};
