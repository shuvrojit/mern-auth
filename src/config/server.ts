import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import { SignUp, LogIn } from "../controllers/user";
import connectDB from "./db"
import { protectedRoute, adminRoute } from "../middleware/auth";
import morgan from "morgan"
import cors from "cors"

const app: Express = express();

connectDB()

app.use(morgan("combined"))
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.send("home");
});

app.post("/signup", SignUp);
app.post("/login", LogIn);
app.use("/secret", protectedRoute, (req: Request, res: Response) => {
  res.status(200);
  res.send("secret");
});

app.use("/admin", protectedRoute, adminRoute, (req: Request, res: Response) => {
  res.status(200);
  res.send("admin");
});

export default app;
