import { RequestHandler } from "express";
import { Users } from "../model/userModel";
import { createOne, deleteOne, getMany, getOne } from "../utils/repo";
import { resJson } from "../utils/resJson";

export const getOneUser: RequestHandler = async (req, res, next) => {
  try {
    // const { id } = req.params;
    // const filter = { id };
    // const sort = {};
    // const user = await getOne(Users, filter, null, sort);
    const user = res.locals.user;

    if (!user) {
      return resJson(res, "Not found User", null, 404);
    }

    return resJson(res, "Get user successfully", user, 200);
  } catch (error) {
    next(error);
  }
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const filter = {};
    const sort = {};
    const user = await getMany(Users, filter, null, sort);

    if (user.length === 0) {
      return resJson(res, "Not found User", null, 404);
    }

    return resJson(res, "Get all user successfully", user, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteOne(Users, id);

    return resJson(res, "Delete user successfully", null, 204);
  } catch (error) {
    next(error);
  }
};
