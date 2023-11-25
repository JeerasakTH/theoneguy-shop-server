import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAllItem,
  getOneItem,
} from "../controller/itemController";

const router = Router();

router.route("/").get(getAllItem).post(createItem);
router.route("/:id").get(getOneItem).delete(deleteItem);

export default router;
