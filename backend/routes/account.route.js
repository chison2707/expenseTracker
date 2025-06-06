import express from "express";
import { getAccounts } from "../controllers/account.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/:userId", requireAuth, getAccounts);

export default router;