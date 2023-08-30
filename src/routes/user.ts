import { Router } from "express";
import { LogIn, SignUp } from "../controllers/user";

const userRouter = Router();

userRouter.post("/login", LogIn);
userRouter.post("/signup", SignUp);
userRouter.post("/kd", (req, res) => {
  console.log(req.body);
});

export default userRouter;
