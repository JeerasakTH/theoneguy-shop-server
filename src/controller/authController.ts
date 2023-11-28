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

    if (!user) {
      // If no user is found with the provided username
      return resJson(res, "Incorrect username", null, 401);
    }

    const correctPassword = user.password === password;
    if (!correctPassword) {
      // If the password is incorrect
      return resJson(res, "Incorrect password", null, 401);
    }

    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "30d",
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

export const logout: RequestHandler = (req, res, next) => {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  resJson(res, "Logout success", null, 200);
};

export const protect: RequestHandler = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return resJson(
        res,
        "You are not logged in! Please log in to get access.",
        null,
        401
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      userId: string;
    };

    const filter = { _id: decoded.userId };
    const sort = {};
    const currentUser = await getOne(Users, filter, null, sort);

    if (!currentUser) {
      return resJson(res, "Token does no longer exist", null, 401);
    }

    res.locals.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};
