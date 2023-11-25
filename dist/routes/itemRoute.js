"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemController_1 = require("../controller/itemController");
const router = (0, express_1.Router)();
router.route("/").get(itemController_1.getAllItem).post(itemController_1.createItem);
router.route("/:id").get(itemController_1.getOneItem).delete(itemController_1.deleteItem);
exports.default = router;
