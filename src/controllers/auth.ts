import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {IUser} from "../models/user"

export const hashPassword = (passwd: string) => {
  return bcrypt.hash(passwd, 5);
};

export const comparePassword = (passwd: string, hash: string) => {
  return bcrypt.compare(passwd, hash);
};

export const createJWT = (user: IUser) => {
  const token = jwt.sign(
    {
      id: user._id.toString(),
      username: user.userName,
    },
    process.env.JWT_SECRET!
  );
  return token;
};

export const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.body.headers;
  console.log(bearer);
  next();
};
