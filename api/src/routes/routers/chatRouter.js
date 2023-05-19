const { Router } = require("express");
const chatRouter = Router();

const {
  getChat,
  getChatById,
  createChat,
  addUsers,
  deleteChat,
  restoreChat
} = require("../controllers/chatController.js");

chatRouter.get("/getChat", getChat);

chatRouter.get("/getChatById", getChatById);

chatRouter.post("/createChat", createChat)

chatRouter.post("/restoreChat", restoreChat);

chatRouter.put("/addUsers", addUsers);

chatRouter.delete("/deleteChat", deleteChat);

module.exports = chatRouter;