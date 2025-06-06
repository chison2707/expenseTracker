import express from "express";
import { addMoneyToAccount, createAccount, getAccounts } from "../controllers/account.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", requireAuth, getAccounts);
router.post("/create", requireAuth, createAccount);
router.patch("/addMonney/:id", requireAuth, addMoneyToAccount);

export default router;