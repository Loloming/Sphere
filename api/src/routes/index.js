const user = require("./routers/userRouter");
const post = require("./routers/postRouter");
const comment = require("./routers/commentRouter");
const like = require("./routers/likeRouter");
const follower = require("./routers/followerRouter");
const chat = require("./routers/chatRouter");
const repost = require("./routers/repostRouter");
const response = require("./routers/replyRouter");
const message = require("./routers/messageRouter");

const { Router } = require('express');
const router = Router();

router.use("/users", user);
router.use("/posts", post);
router.use("/comments", comment);
router.use("/likes", like);
router.use("/followers", follower);
router.use("/chats", chat);
router.use("/reposts", repost);
router.use("/replies", response);
router.use("/messages", message);



module.exports = router;