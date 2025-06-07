import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { addTransaction, dashboard, getTransactions, tranferMoney } from "../controllers/transaction.controller.js";
import { tranferMoneyVld, transaction } from "../validates/transaction.validate.js";

const router = express.Router();
router.get("/", requireAuth, getTransactions);
router.get("/dashboard", requireAuth, dashboard);
router.post("/addTransaction/:accountId", requireAuth, transaction, addTransaction);
router.patch("/transferMoney", requireAuth, tranferMoneyVld, tranferMoney);

export default router;