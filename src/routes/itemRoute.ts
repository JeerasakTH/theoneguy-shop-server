import { Router } from "express";
import { getAllItem } from "../controller/itemController";

const router = Router();

router.route("/").get(getAllItem);

export default router;
