import express from "express";
// import account from "./account.route";
import userRoutes from "./user.route.js";
// import transaction from "./transaction.route";
// import user from "./user.route";

const router = express.Router();

router.use("/users", userRoutes);
// router.use("/user", user);
// router.use("/account", account);
// router.use("/transaction", transaction);

export default router;