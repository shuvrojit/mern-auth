import { Request, Response } from "express";
import asyncHandler from "../middleware/async-handler";
import User from "../models/user";
import { hashPassword, comparePassword, createJWT } from "../middleware/auth";

export const SignUp = asyncHandler(async (req: Request, res: Response) => {
  const hash = await hashPassword(req.body.password);
  const userExists = await User.findOne({ userName: req.body.userName });
  if (userExists) {
    res.status(404);
    res.send("User alreay exists");
    return;
  }
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    password: hash,
  });
  if (!user) {
    res.status(401);
    res.send("error");
    return;
  }
  user.save();

  const token = createJWT(user);
  res.status(200).json({ token });
});

export const LogIn = asyncHandler(async (req: Request, res: Response) => {
  const query = User.where({ userName: req.body.userName });
  const user = await query.findOne();
  if (!user) {
    res.send("User not found");
    return;
  }
  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.send("Wrong password");
    return;
  }
  res.status(200);

  const token = createJWT(user);
  res.json({ token });
});
