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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUser = exports.getOneUser = void 0;
const userModel_1 = require("../model/userModel");
const repo_1 = require("../utils/repo");
const resJson_1 = require("../utils/resJson");
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const filter = { id };
        const sort = {};
        const user = yield (0, repo_1.getOne)(userModel_1.Users, filter, null, sort);
        if (!user) {
            return (0, resJson_1.resJson)(res, "Not found User", null, 404);
        }
        return (0, resJson_1.resJson)(res, "Get user successfully", user, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getOneUser = getOneUser;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {};
        const sort = {};
        const user = yield (0, repo_1.getMany)(userModel_1.Users, filter, null, sort);
        if (user.length === 0) {
            return (0, resJson_1.resJson)(res, "Not found User", null, 404);
        }
        return (0, resJson_1.resJson)(res, "Get all user successfully", user, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUser = getAllUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, repo_1.deleteOne)(userModel_1.Users, id);
        return (0, resJson_1.resJson)(res, "Delete user successfully", null, 204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
