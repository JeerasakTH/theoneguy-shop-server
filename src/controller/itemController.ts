import { Items } from "../model/itemModel";
import { createOne, deleteOne, getMany, getOne } from "../utils/repo";
import { RequestHandler } from "express";
import { resJson } from "../utils/resJson";

export const getOneItem: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };
    const sort = {};
    const items = await getOne(Items, filter, null, sort);

    if (!items) {
      return resJson(res, "Not found Item", null, 404);
    }

    return resJson(res, "Get item successfully", items, 200);
  } catch (error) {
    next(error);
  }
};

export const getAllItem: RequestHandler = async (req, res, next) => {
  try {
    const filter = {};
    const sort = {};
    const items = await getMany(Items, filter, null, sort);

    if (items.length === 0) {
      return resJson(res, "Not found Item", null, 404);
    }

    return resJson(res, "Get all item successfully", items, 200);
  } catch (error) {
    next(error);
  }
};

export const createItem: RequestHandler = async (req, res, next) => {
  try {
    const obj = req.body;
    const item = await createOne(Items, obj);

    return resJson(res, "Create item successfully", item, 201);
  } catch (error) {
    next(error);
  }
};

export const deleteItem: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteOne(Items, id);

    return resJson(res, "Delete item successfully", null, 204);
  } catch (error) {
    next(error);
  }
};
