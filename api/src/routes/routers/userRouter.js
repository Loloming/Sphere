const { Router } = require("express");
const userRouter = Router();

const {
  getUser,
  getUserById,
  getUserByUsername,
  registerUser,
  loginUser,
  putUser,
  deleteUser,
  restoreUser,
} = require("../controllers/userController");

userRouter.get("/getUser", getUser);

userRouter.get("/getUserById", getUserById);

userRouter.get("/getUserByUsername", getUserByUsername);

userRouter.post("/registerUser", registerUser)

userRouter.post("/loginUser", loginUser);

userRouter.put("/putUser", putUser);

userRouter.delete("/deleteUser", deleteUser);

module.exports = userRouter;