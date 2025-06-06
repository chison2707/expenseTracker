import express from "express";
import accountRoutes from "./account.route.js";
import userRoutes from "./user.route.js";
// import transaction from "./transaction.route";
// import user from "./user.route";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);
// router.use("/user", user);
// router.use("/transaction", transaction);

export default router;