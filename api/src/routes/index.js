const user = require("./routers/userRouter");
const post = require("./routers/postRouter");


const { Router } = require('express');
const router = Router();

router.use("/users", user);
router.use("/posts", post);



module.exports = router;