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
exports.getAllItem = void 0;
const fakebook_1 = require("../model/fakebook");
const getAllItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield fakebook_1.Fakebook.find();
        res.status(200).send({
            message: "success",
            data: test,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAllItem = getAllItem;
