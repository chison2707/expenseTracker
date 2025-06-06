import express from "express";
import accountRoutes from "./account.route.js";
import userRoutes from "./user.route.js";
import transactionRoutes from "./transaction.route.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);

export default router;