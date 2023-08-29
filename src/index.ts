import app from "./config/server";
import dotenv from "dotenv";

dotenv.config();

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ...`);
});
