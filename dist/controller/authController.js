"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.logout = exports.login = exports.signup = void 0;
const userModel_1 = require("../model/userModel");
const repo_1 = require("../utils/repo");
const resJson_1 = require("../utils/resJson");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = req.body;
        const user = yield (0, repo_1.createOne)(userModel_1.Users, obj);
        return (0, resJson_1.resJson)(res, "Create user successfully", user, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return (0, resJson_1.resJson)(res, "Please provide username and password", null, 400);
        }
        const filter = { username };
        const sort = {};
        const user = yield (0, repo_1.getOne)(userModel_1.Users, filter, null, sort);
        if (!user) {
            // If no user is found with the provided username
            return (0, resJson_1.resJson)(res, "Incorrect username", null, 401);
        }
        const correctPassword = user.password === password;
        if (!correctPassword) {
            // If the password is incorrect
            return (0, resJson_1.resJson)(res, "Incorrect password", null, 401);
        }
        const secret = process.env.JWT_SECRET || "secret";
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, {
            expiresIn: process.env.JWT_EXPIRES_IN || "30d",
        });
        const expireDay = 30;
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + expireDay * 24 * 60 * 60 * 1000),
            httpOnly: true,
            // secure: true,
        });
        return (0, resJson_1.resJson)(res, "Login success", user, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => {
    res.cookie("jwt", "loggedOut", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    (0, resJson_1.resJson)(res, "Logout success", null, 200);
};
exports.logout = logout;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return (0, resJson_1.resJson)(res, "You are not logged in! Please log in to get access.", null, 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        const filter = { _id: decoded.userId };
        const sort = {};
        const currentUser = yield (0, repo_1.getOne)(userModel_1.Users, filter, null, sort);
        if (!currentUser) {
            return (0, resJson_1.resJson)(res, "Token does no longer exist", null, 401);
        }
        res.locals.user = currentUser;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.protect = protect;
