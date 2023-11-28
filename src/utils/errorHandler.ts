import { ErrorRequestHandler } from "express";
import { resJson } from "./resJson";
import { error } from "console";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  // Params wrong
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;

    return resJson(res, message, null, 400);
  }

  // Duplicate key
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue).join("");
    const message = `The key '${key}' has duplicate value of '${err.keyValue[key]}'`;

    return resJson(res, message, null, 400);
  }

  // Fields missing
  if (err.name === "ValidationError") {
    const errors: { message: string }[] = Object.values(err.errors);
    const message = `Invalid input data. ${errors
      .map((el) => el.message)
      .join(". ")}`;

    return resJson(res, message, null, 400);
  }

  // token wrong
  if (error.name === "JsonWebTokenError") {
    return resJson(res, "Invalid token. Please log in again!", null, 401);
  }

  // token has expired
  if (error.name === "TokenExpiredError") {
    return resJson(
      res,
      "Your token has expired! Please log in again",
      null,
      401
    );
  }

  return resJson(res, "Something went wrong", null, 500);
};
