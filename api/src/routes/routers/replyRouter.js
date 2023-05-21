const { Router } = require("express");
const replyRouter = Router();

const {
  getReply,
  getReplyById,
  createReply,
  deleteReply,
  restoreReply
} = require("../controllers/replyController");

replyRouter.get("/getReply", getReply);

replyRouter.get("/getReplyById", getReplyById);

replyRouter.post("/createReply", createReply)

replyRouter.post("/restoreReply", restoreReply);

replyRouter.delete("/deleteReply", deleteReply);

module.exports = replyRouter;