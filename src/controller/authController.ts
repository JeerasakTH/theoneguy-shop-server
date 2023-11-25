import { RequestHandler } from "express";
import { Users } from "../model/userModel";
import { createOne, getOne } from "../utils/repo";
import { resJson } from "../utils/resJson";
import jwt from "jsonwebtoken";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const obj = req.body;
    const user = await createOne(Users, obj);

    return resJson(res, "Create user successfully", user, 201);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return resJson(res, "Please provide username and password", null, 400);
    }

    const filter = { username };
    const sort = {};
    const user = await getOne(Users, filter, null, sort);

    const correctPassword = user.password === password;
    if (!user || !correctPassword) {
      resJson(res, "Incorrect username or password", null, 401);
    }

    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign(user.id, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const expireDay = 30;
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + expireDay * 24 * 60 * 60 * 1000),
      httpOnly: true,
      // secure: true,
    });

    return resJson(res, "Login success", user, 200);
  } catch (error) {
    next(error);
  }
};
