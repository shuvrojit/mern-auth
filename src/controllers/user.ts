import { Request, Response, NextFunction } from "express";
import connect from "../db";
import User from "../models/user";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  connect()
    .then(async () => {
      const query = User.where({ userName: req.body.userName });
      const userExists = await query.findOne();
      if (userExists) {
        res.status(301);
        res.send("User alreay exists");
        return;
      }
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
      });
      if (!user) {
        res.status(401);
        res.send("error");
        return;
      }
      user.save();
      res.status(200);
      res.send("User created");
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
      if (req.body.password !== user.password) {
        res.status(401);
        res.send("Wrong password");
        return;
      }
      res.send(user);
      res.status(200);
      next();
    })
    .catch((e) => console.log(e));
};
