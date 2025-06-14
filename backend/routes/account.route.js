import express from "express";
import { addMoneyToAccount, createAccount, deleteAccount, getAccounts } from "../controllers/account.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", requireAuth, getAccounts);
router.post("/create", requireAuth, createAccount);
router.patch("/addMonney/:id", requireAuth, addMoneyToAccount);
router.patch("/deleteAccount/:id", requireAuth, deleteAccount);

export default router;