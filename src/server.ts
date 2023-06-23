import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import { SignUp, LogIn } from "./controllers/user";
import { protectedRoute } from "./controllers/auth";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.send("home");
});

app.post("/signup", SignUp);
app.post("/login", LogIn);
app.use("/secret", protectedRoute, (req: Request, res: Response) => {
  res.status(200)
  res.send("secret")
});

export default app;
