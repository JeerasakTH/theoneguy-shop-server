"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemController_1 = require("../controller/itemController");
const router = (0, express_1.Router)();
router.route("/").get(itemController_1.getAllItem);
exports.default = router;
