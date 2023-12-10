import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { DB, PORT } from "./constants";
import itemRoutes from "./routes/itemRoute";
import userRoutes from "./routes/userRoute";
import geoRoutes from "./routes/geoRoute";
import { errorHandler } from "./utils/errorHandler";
import cors from "cors";
import { resJson } from "./utils/resJson";

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

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
app.use("/api/users", userRoutes);
app.use("/api/geo", geoRoutes)

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return resJson(
    res,
    `Can't find ${req.originalUrl} on this server!`,
    null,
    404
  );
});

app.use(errorHandler);

app.listen(PORT, () => {
  connect();
  console.log(`Listening on ${PORT}`);
});
