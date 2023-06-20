import app from "./server";
import dotenv from "dotenv";
import testDb from "./db";

dotenv.config();

const PORT: string | number = process.env.PORT || 8080;

testDb();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ...`);
});
