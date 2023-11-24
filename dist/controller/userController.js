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
exports.getOneUser = void 0;
const userModel_1 = require("../model/userModel");
const repo_1 = require("../utils/repo");
const appError_1 = __importDefault(require("../utils/appError"));
const resJson_1 = require("../utils/resJson");
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const filter = { id };
    const sort = {};
    const user = yield (0, repo_1.getOne)(userModel_1.Users, filter, null, sort);
    if (!user) {
        next(new appError_1.default("Not found user", 404));
    }
    return (0, resJson_1.resJson)(res, "Get user successfully", user, 200);
});
exports.getOneUser = getOneUser;
