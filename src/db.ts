import mongoose from "mongoose";
import "dotenv/config";

const DB_URL: string = process.env.mongourl!;

export default async function testDb() {
  try {
    await mongoose.connect(DB_URL);
    console.log("db connected");
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.disconnect();
    console.log("db disconnected");
  }
}
