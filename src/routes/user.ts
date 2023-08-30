import { Router } from "express";
import { LogIn, SignUp, LogOut } from "../controllers/user";
import userValidation from "../validation/user";
import {protectedRoute} from "../middleware/auth"

const userRouter = Router();

userRouter.post("/login", LogIn);
userRouter.post("/signup", userValidation, SignUp);
userRouter.get("/logout", protectedRoute, LogOut)

export default userRouter;
