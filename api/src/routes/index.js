const user = require("./routers/userRouter");
const post = require("./routers/postRouter");
const comment = require("./routers/commentRouter");
const like = require("./routers/likeRouter");
const follower = require("./routers/followerRouter");

const { Router } = require('express');
const router = Router();

router.use("/users", user);
router.use("/posts", post);
router.use("/comments", comment);
router.use("/likes", like);
router.use("/followers", follower);



module.exports = router;