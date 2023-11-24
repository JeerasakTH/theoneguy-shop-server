import { Response } from "express";

export const resJson = (
  res: Response,
  message: string,
  data: Record<string, any>,
  statusCode: number
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};
