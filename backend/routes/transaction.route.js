import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getTransactions } from "../controllers/transaction.controller.js";

const router = express.Router();
router.get("/:userId", requireAuth, getTransactions);

export default router;