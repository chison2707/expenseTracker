import express from "express";
import { addMoneyToAccount, createAccount, getAccounts } from "../controllers/account.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/:userId", requireAuth, getAccounts);
router.post("/create/:userId", requireAuth, createAccount);
router.patch("/addMonney/:userId/:id", requireAuth, addMoneyToAccount);

export default router;