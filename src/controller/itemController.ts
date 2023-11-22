import { RequestHandler } from "express";
import { Fakebook } from "../model/fakebook";

export const getAllItem: RequestHandler = async (req, res, next) => {
  try {
    const test = await Fakebook.find();
    res.status(200).send({
      message: "success",
      data: test,
    });
  } catch (err) {
    console.log(err);
  }
};
