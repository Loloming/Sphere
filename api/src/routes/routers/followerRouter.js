const { Router } = require("express");
const followerRouter = Router();

const {
  getFollower,
  getFollowerById,
  createFollower,
  deleteFollower,
  restoreFollower
} = require("../controllers/followerController");

followerRouter.get("/getFollower", getFollower);

followerRouter.get("/getFollowerById", getFollowerById);

followerRouter.post("/createFollower", createFollower)

followerRouter.post("/restoreFollower", restoreFollower);

followerRouter.delete("/deleteFollower", deleteFollower);

module.exports = followerRouter;