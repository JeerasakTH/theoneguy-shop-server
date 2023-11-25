"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resJson = void 0;
const resJson = (res, message, data, statusCode) => {
    const codeToStr = statusCode.toString();
    const status = codeToStr.startsWith("2") ? "success" : "fail";
    return res.status(statusCode).json({
        status: status,
        message,
        data,
    });
};
exports.resJson = resJson;
