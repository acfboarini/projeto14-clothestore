import { Router } from "express";
import { login, logout, signup } from "../controllers/userController.js";

const userRouter = new Router();

userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.delete('/logout', logout);

export default userRouter;