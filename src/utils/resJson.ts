import { Response } from "express";

export const resJson = (
  res: Response,
  message: string,
  data: Record<string, any> | null,
  statusCode: number
) => {
  const codeToStr = statusCode.toString();
  const status = codeToStr.startsWith("2") ? "success" : "fail";

  return res.status(statusCode).json({
    status: status,
    message,
    data,
  });
};
