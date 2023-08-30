import { Router } from "express";
import { LogIn, SignUp } from "../controllers/user";
import userValidation from "../validation/user";

const userRouter = Router();

userRouter.post("/login", LogIn);
userRouter.post("/signup", userValidation, SignUp);

export default userRouter;
