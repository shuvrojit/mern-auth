import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export {};
