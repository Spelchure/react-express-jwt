import express, { Request, Response } from "express";
import bodyParser from "body-parser";

export default function createServer() {
  const app = express();

  //app.use(bodyParser.json());
  //app.use(cors());
  app.use("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Success" });
  });

  /* Error handler */
  app.use((error: Error, req: Request, res: Response) => {
    return res.status(500).json({ error: error.message });
  });
  return app;
}
