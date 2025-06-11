import express from "express";
import { register, loginPost, detail, changePassword, editController } from "../controllers/user.controller.js";
import { registerPost, login, changePass, editUser } from "../validates/user.validate.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerPost, register);
router.post("/login", login, loginPost);
router.get("/detail", requireAuth, detail);
router.patch("/changePass", requireAuth, changePass, changePassword);
router.patch("/edit", requireAuth, editUser, editController);

export default router;