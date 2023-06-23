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
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
      });
      if (!user) {
        res.send("error");
      }
      user.save();
      res.status(200);
      res.send("saved");
      next();
    })
    .catch((e) => console.log(e));
};
