import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getOneUser,
} from "../controller/userController";
import { login, logout, protect, signup } from "../controller/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.route("/").get(protect, getOneUser);
router.route("/allUsers").get(getAllUser);
router.route("/:id").delete(deleteUser);

export default router;
