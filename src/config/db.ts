import mongoose from "mongoose";
import "dotenv/config";

const DB_URL: string = process.env.mongourl!;

const connectDB = () => {
  try {
    return mongoose.connect(DB_URL);
  } catch (e) {
    console.log(e)
  }
};

export default connectDB;
