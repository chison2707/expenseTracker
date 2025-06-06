import { pool } from "../config/database.js";

export const getAccounts = async (req, res) => {
    try {
        const userId = req.params.userId;

        const accounts = await pool.query({
            text: `SELECT * FROM tblaccount WHERE user_id = $1`,
            values: [userId],
        });

        return res.json({
            status: 200,
            data: accounts.rows,
        });
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        });
    }
};