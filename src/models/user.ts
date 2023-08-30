import mongoose from "mongoose";
import { IUser } from "../types";

const userSchema = new mongoose.Schema<IUser>({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("user", userSchema);

export default User;
