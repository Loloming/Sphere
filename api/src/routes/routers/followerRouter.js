const { Router } = require("express");
const followerRouter = Router();

const {
  getFollower,
  getFollowersById,
  getFollowingById,
  createFollower,
  deleteFollower,
  restoreFollower
} = require("../controllers/followerController");

followerRouter.get("/getFollower", getFollower);

followerRouter.get("/getFollowersById", getFollowersById);

followerRouter.get("/getFollowingById", getFollowingById);

followerRouter.post("/createFollower", createFollower)

followerRouter.post("/restoreFollower", restoreFollower);

followerRouter.delete("/deleteFollower", deleteFollower);

module.exports = followerRouter;