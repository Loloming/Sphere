const { Router } = require("express");
const likeRouter = Router();

const {
  getLike,
  getLikeById,
  createLike,
  putLike,
  deleteLike,
  restoreLike
} = require("../controllers/likeController");

likeRouter.get("/getLike", getLike);

likeRouter.get("/getLikeById", getLikeById);

likeRouter.post("/createLike", createLike)

likeRouter.post("/restoreLike", restoreLike);

likeRouter.put("/putLike", putLike);

likeRouter.delete("/deleteLike/:id", deleteLike);

module.exports = likeRouter;