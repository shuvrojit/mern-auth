import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types";

export const hashPassword = (passwd: string) => {
  return bcrypt.hash(passwd, 5);
};

export const comparePassword = (passwd: string, hash: string) => {
  return bcrypt.compare(passwd, hash);
};

export const createJWT = (user: IUser) => {
  const token = jwt.sign(
    {
      id: user.id.toString(),
      username: user.userName,
      role: user.role,
    },
    process.env.JWT_SECRET!
  );
  return token;
};

export const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwtToken;
  // const bearer = req.headers.authorization;
  // if (!bearer) {
  // res.status(401);
  // res.json({ message: "Unauthorized" });
  // return;
  // }

  // const [_, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Unauthorized!" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: `Invalid token`, error: e });
    return;
  }
};

export const adminRoute = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role == "admin") {
    next();
  } else {
    res.status(401);
    res.json({ message: "You're not admin" });
    return;
  }
};
