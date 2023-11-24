"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resJson = void 0;
const resJson = (res, message, data, statusCode) => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data,
    });
};
exports.resJson = resJson;
