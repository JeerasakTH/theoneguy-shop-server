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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTambon = exports.getAmphure = exports.getProvice = void 0;
const thai_geographies_json_1 = __importDefault(require("../province-data/thai_geographies.json"));
const thai_provinces_json_1 = __importDefault(require("../province-data/thai_provinces.json"));
const thai_amphures_json_1 = __importDefault(require("../province-data/thai_amphures.json"));
const thai_tambons_json_1 = __importDefault(require("../province-data/thai_tambons.json"));
const resJson_1 = require("../utils/resJson");
const geo = thai_geographies_json_1.default.RECORDS;
const province = thai_provinces_json_1.default.RECORDS;
const amphure = thai_amphures_json_1.default.RECORDS;
const tambon = thai_tambons_json_1.default.RECORDS;
const getProvice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, resJson_1.resJson)(res, "Get province", province, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getProvice = getProvice;
const getAmphure = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { provinceid } = req.params;
        const provinceToAmphure = amphure.filter((item) => item.province_id === +provinceid);
        return (0, resJson_1.resJson)(res, "Get Amphure", provinceToAmphure, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getAmphure = getAmphure;
const getTambon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amphureid } = req.params;
        const amphureToTambon = tambon.filter((item) => item.amphure_id === +amphureid);
        return (0, resJson_1.resJson)(res, "Get Tambon", amphureToTambon, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getTambon = getTambon;
