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
exports.login = exports.signup = void 0;
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
        const correctPassword = user.password === password;
        if (!user || !correctPassword) {
            (0, resJson_1.resJson)(res, "Incorrect username or password", null, 401);
        }
        const secret = process.env.JWT_SECRET || "secret";
        const token = jsonwebtoken_1.default.sign(user.id, secret, {
            expiresIn: process.env.JWT_EXPIRES_IN,
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
