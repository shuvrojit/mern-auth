import { Request, Response, NextFunction } from "express";
import connect from "../db";
import User from "../models/user";
import { hashPassword, comparePassword, createJWT } from "./auth";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  connect()
    .then(async () => {
      const hash = await hashPassword(req.body.password);
      const query = User.where({ userName: req.body.userName });
      const doesExists = await query.findOne();
      if (doesExists) {
        res.status(301);
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
      res.status(200);

      const token = createJWT(user)
      res.json({token})

      next();
    })
    .catch((e) => console.log(e));
};

export const LogIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  connect()
    .then(async () => {
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

      const token = createJWT(user)
      res.json({token})

      next();
    })
    .catch((e) => console.log(e));
};
