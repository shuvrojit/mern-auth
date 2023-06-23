import mongoose from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  date: Date;
}

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
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
