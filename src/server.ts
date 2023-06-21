import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req: Request, res: Response) => {
  res.status(200)
  res.send("home")
})

export default app;
