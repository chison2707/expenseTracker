import { pool } from "../config/database.js";

//[GET] /api/v1/transactions/:userId?s=mb
export const getTransactions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const today = new Date();

        const _sevenDaysAgo = new Date(today);

        _sevenDaysAgo.setDate(today.getDate() - 7);

        const sevenDaysAgo = _sevenDaysAgo.toISOString().split("T")[0];

        const { df, dt, s } = req.query;

        const startDate = new Date(df || sevenDaysAgo);
        const endDate = new Date(dt || new Date());

        const transactions = await pool.query({
            text: `SELECT * FROM tbltransaction WHERE user_id = $1 AND createdat BETWEEN $2 AND $3 
            AND (description ILIKE '%' || $4 || '%' OR status ILIKE '%' || $4 || '%' OR source ILIKE '%' || $4 || '%') 
            ORDER BY id DESC`,
            values: [userId, startDate, endDate, s],
        });

        return res.json({
            status: 200,
            message: "Lấy thông tin giao dịch thành công!",
            data: transactions.rows,
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: error.message
        });
    }
};