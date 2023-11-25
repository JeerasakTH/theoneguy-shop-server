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
exports.deleteItem = exports.createItem = exports.getAllItem = exports.getOneItem = void 0;
const itemModel_1 = require("../model/itemModel");
const repo_1 = require("../utils/repo");
const resJson_1 = require("../utils/resJson");
const getOneItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const filter = { _id: id };
        const sort = {};
        const items = yield (0, repo_1.getOne)(itemModel_1.Items, filter, null, sort);
        if (!items) {
            return (0, resJson_1.resJson)(res, "Not found Item", null, 404);
        }
        return (0, resJson_1.resJson)(res, "Get item successfully", items, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getOneItem = getOneItem;
const getAllItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {};
        const sort = {};
        const items = yield (0, repo_1.getMany)(itemModel_1.Items, filter, null, sort);
        if (items.length === 0) {
            return (0, resJson_1.resJson)(res, "Not found Item", null, 404);
        }
        return (0, resJson_1.resJson)(res, "Get all item successfully", items, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllItem = getAllItem;
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = req.body;
        const item = yield (0, repo_1.createOne)(itemModel_1.Items, obj);
        return (0, resJson_1.resJson)(res, "Create item successfully", item, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.createItem = createItem;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, repo_1.deleteOne)(itemModel_1.Items, id);
        return (0, resJson_1.resJson)(res, "Delete item successfully", null, 204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteItem = deleteItem;
