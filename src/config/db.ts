import mongoose from "mongoose";
import "dotenv/config";

const DB_URL: string = process.env.mongoURL!;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    process.stdout.write("Database connected\n");
  } catch (e) {
    process.stdout.write(`Error ${e}\n`);
    process.exit(1);
  }
};

export default connectDB;
