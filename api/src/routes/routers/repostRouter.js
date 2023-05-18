const { Router } = require("express");
const repostRouter = Router();

const {
  getRepost,
  getRepostById,
  createRepost,
  deleteRepost,
  restoreRepost
} = require("../controllers/repostController");

repostRouter.get("/getRepost", getRepost);

repostRouter.get("/getRepostById", getRepostById);

repostRouter.post("/createRepost", createRepost)

repostRouter.post("/restoreRepost", restoreRepost);

repostRouter.delete("/deleteRepost", deleteRepost);

module.exports = repostRouter;