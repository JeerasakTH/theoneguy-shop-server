import express, { Request, Response } from "express";

const app = express();

const PORT = 8080;

app.get("/", (_req: Request, res: Response) => {
  return res.send({
    message: "test",
  });
});

app.get("/test", (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "test",
  });
});

app.listen(PORT, () => console.log(`pass`));
