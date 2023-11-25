"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const resJson_1 = require("./resJson");
const console_1 = require("console");
const errorHandler = (err, req, res, next) => {
    // Params wrong
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}: ${err.value}`;
        return (0, resJson_1.resJson)(res, message, null, 400);
    }
    // Duplicate key
    if (err.code === 11000) {
        const key = Object.keys(err.keyValue).join("");
        const message = `The key '${key}' has duplicate value of '${err.keyValue[key]}'`;
        return (0, resJson_1.resJson)(res, message, null, 400);
    }
    // Fields missing
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors);
        const message = `Invalid input data. ${errors
            .map((el) => el.message)
            .join(". ")}`;
        return (0, resJson_1.resJson)(res, message, null, 400);
    }
    // token wrong
    if (console_1.error.name === "JsonWebTokenError") {
    }
    // token has expired
    if (console_1.error.name === "TokenExpiredError") {
    }
    return (0, resJson_1.resJson)(res, "Something went wrong", null, 500);
};
exports.errorHandler = errorHandler;
