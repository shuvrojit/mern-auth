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

export interface UserRequest extends Request {
  user?: Object;
}

export const protectedRoute = (req: UserRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if(!bearer) {
    res.status(401)
    res.json({message: "Unauthorized"})
    return
  }

  const [_, token] = bearer.split(" ")

  if(!token) {
    res.status(401)
    res.json({message: "Invalid token"})
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = user
    console.log(user)
    next()
  } catch (e) {
    console.log(e)
    res.status(401)
    res.json({message: `Invalid token`})
    return
  }
};
