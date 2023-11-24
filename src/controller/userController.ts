import { RequestHandler } from "express";
import { Users } from "../model/userModel";
import { getOne } from "../utils/repo";
import AppError from "../utils/appError";
import { resJson } from "../utils/resJson";

export const getOneUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const filter = { id };
  const sort = {};
  const user = await getOne(Users, filter, null, sort);

  if (!user) {
    next(new AppError("Not found user", 404));
  }

  return resJson(res, "Get user successfully", user, 200);
};
