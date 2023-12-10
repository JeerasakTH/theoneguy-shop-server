"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geoController_1 = require("../controller/geoController");
const router = (0, express_1.Router)();
router.route("/").get(geoController_1.getProvice);
router.route("/amphure/:provinceid").get(geoController_1.getAmphure);
router.route("/tambon/:amphureid").get(geoController_1.getTambon);
exports.default = router;
