import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import router from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use((req, res) => {
    res.status(404).json({
        status: 404,
        message: "Không tồn tại!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});