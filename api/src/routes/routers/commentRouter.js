const { Router } = require("express");
const commentRouter = Router();

const {
  getComment,
  getCommentById,
  createComment,
  putComment,
  deleteComment,
  restoreComment
} = require("../controllers/commentController");

commentRouter.get("/getComment", getComment);

commentRouter.get("/getCommentById", getCommentById);

commentRouter.post("/createComment", createComment)

commentRouter.post("/restoreComment", restoreComment);

commentRouter.put("/putComment", putComment);

commentRouter.delete("/deleteComment", deleteComment);

module.exports = commentRouter;