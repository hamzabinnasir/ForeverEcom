import express from "express"
import { loginUser, registerUser, adminLogin, socialLogin, getAllUsers, deleteUserById } from "../controllers/userController.js"
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/all", getAllUsers);
userRouter.post("/delete", deleteUserById);
userRouter.post("/social-login", socialLogin);

export default userRouter;
