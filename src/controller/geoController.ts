import Geo from "../province-data/thai_geographies.json";
import Provice from "../province-data/thai_provinces.json";
import Amphure from "../province-data/thai_amphures.json";
import Tambon from "../province-data/thai_tambons.json";
import { RequestHandler } from "express";
import { resJson } from "../utils/resJson";

const geo = Geo.RECORDS;
const province = Provice.RECORDS;
const amphure = Amphure.RECORDS;
const tambon = Tambon.RECORDS;

export const getProvice: RequestHandler = async (req, res, next) => {
  try {
    return resJson(res, "Get province", province, 200);
  } catch (error) {
    next(error);
  }
};

export const getAmphure: RequestHandler = async (req, res, next) => {
  try {
    const { provinceid } = req.params;
    const provinceToAmphure = amphure.filter(
      (item) => item.province_id === +provinceid
    );

    return resJson(res, "Get Amphure", provinceToAmphure, 200);
  } catch (error) {
    next(error);
  }
};

export const getTambon: RequestHandler = async (req, res, next) => {
  try {
    const { amphureid } = req.params;
    const amphureToTambon = tambon.filter(
      (item) => item.amphure_id === +amphureid
    );

    return resJson(res, "Get Tambon", amphureToTambon, 200);
  } catch (error) {
    next(error);
  }
};
