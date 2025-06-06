import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { dashboard, getTransactions } from "../controllers/transaction.controller.js";

const router = express.Router();
router.get("/", requireAuth, getTransactions);
router.get("/dashboard", requireAuth, dashboard);

export default router;