import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getOneUser,
} from "../controller/userController";
import { login, signup } from "../controller/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getAllUser);
router.route("/:id").get(getOneUser).delete(deleteUser);

export default router;
