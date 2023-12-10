import { Router } from "express";
import { getAmphure, getProvice, getTambon } from "../controller/geoController";

const router = Router();

router.route("/").get(getProvice);
router.route("/amphure/:provinceid").get(getAmphure);
router.route("/tambon/:amphureid").get(getTambon);

export default router;
