import { Router } from "express";
import {
  createItem,
  getAllItem,
  getOneItem,
} from "../controller/itemController";

const router = Router();

router.route("/").get(getAllItem).post(createItem);
router.route("/:id").get(getOneItem);

export default router;
