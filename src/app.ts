import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { DB, PORT } from "./constants";
import itemRoutes from "./routes/itemRoute";
import { errorHandler } from "./utils/errorHandler";
import AppError from "./utils/appError";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

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
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  connect();
  console.log(`Listening on ${PORT}`);
});
