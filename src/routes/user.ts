import { Router } from "express";
import { LogIn, SignUp } from "../controllers/user";

const userRouter = Router();

userRouter.post("/login", LogIn);
userRouter.post("/signup", SignUp);

export default userRouter;
