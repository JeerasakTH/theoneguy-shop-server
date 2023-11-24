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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getMany = exports.getOne = void 0;
const getOne = (Model, doc, projection, options) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = yield Model.findOne(doc, projection, options);
    return obj;
});
exports.getOne = getOne;
const getMany = (Model, filter, projection, options) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = yield Model.find(filter, projection, options);
    return obj;
});
exports.getMany = getMany;
const createOne = (Model, doc) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = yield Model.create(doc);
    return obj;
});
exports.createOne = createOne;
const updateOne = (Model, doc, id) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = yield Model.findByIdAndUpdate(id, doc, { new: true });
    return obj;
});
exports.updateOne = updateOne;
const deleteOne = (Model, id) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = yield Model.findByIdAndDelete(id);
    return obj;
});
exports.deleteOne = deleteOne;
