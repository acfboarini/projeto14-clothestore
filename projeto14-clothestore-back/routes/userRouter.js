import { Router } from "express";
import { login, logout, signup } from "../controllers/userController.js";

const userRouter = new Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.delete('/logout', logout);

export default userRouter;