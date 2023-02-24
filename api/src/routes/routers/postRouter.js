const { Router } = require("express");
const postRouter = Router();

const {
  getPost,
  getPostById,
  createPost,
  putPost,
  deletePost,
  restorePost
} = require("../controllers/postController");

postRouter.get("/getPost", getPost);

postRouter.get("/getPostById", getPostById);

postRouter.post("/createPost", createPost)

postRouter.post("/restorePost", restorePost);

postRouter.put("/putPost", putPost);

postRouter.delete("/deletePost", deletePost);

module.exports = postRouter;