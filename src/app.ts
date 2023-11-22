import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { DB, PORT } from "./constants";
import itemRoutes from "./routes/itemRoute";

const app = express();
app.use(express.json());

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB).then(() => console.log("Connected to MongoDB"));
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnect", () => console.log("MongoDB disconnected"));
mongoose.connection.on("connect", () => console.log("MongoDB connected"));

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "test",
  });
});

app.use("/api/items", itemRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    message: "fail",
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Listening on ${PORT}`);
});
