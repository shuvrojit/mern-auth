import mongoose from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

export default User;
