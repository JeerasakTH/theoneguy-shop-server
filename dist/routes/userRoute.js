"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
router.post("/signup", authController_1.signup);
router.post("/login", authController_1.login);
router.route("/").get(authController_1.protect, userController_1.getOneUser);
router.route("/allUsers").get(userController_1.getAllUser);
router.route("/:id").delete(userController_1.deleteUser);
exports.default = router;