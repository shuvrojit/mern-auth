import mongoose from "mongoose";
import "dotenv/config";

const DB_URL: string = process.env.mongourl!;

const connect = () => {
  return mongoose.connect(DB_URL);
};

export default connect;
