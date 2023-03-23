const { Router } = require("express");
const messageRouter = Router();

const {
  getMessage,
  getMessageById,
  createMessage,
  putMessage,
  deleteMessage,
  restoreMessage
} = require("../controllers/MessageController");

messageRouter.get("/getMessage", getMessage);

messageRouter.get("/getMessageById", getMessageById);

messageRouter.post("/createMessage", createMessage)

messageRouter.post("/restoreMessage", restoreMessage);

messageRouter.put("/putMessage", putMessage);

messageRouter.delete("/deleteMessage", deleteMessage);

module.exports = messageRouter;