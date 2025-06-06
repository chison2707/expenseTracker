import { pool } from "../config/database.js";
import { getMonthName } from "../helpers/month.js";

//[GET] /api/v1/transactions
export const getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
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

//[GET] /api/v1/transactions/dashboard
export const dashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        let totalIncome = 0;
        let totalExpense = 0;

        const transactionsResult = await pool.query({
            text: `SELECT type, SUM(amount) AS totalAmount FROM 
    tbltransaction WHERE user_id = $1 GROUP BY type`,
            values: [userId],
        });

        const transactions = transactionsResult.rows;

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.totalamount;
            } else {
                totalExpense += transaction.totalamount;
            }
        });

        const availableBalance = totalIncome - totalExpense;

        // dữ liệu giao dịch trong 12 tháng
        const year = new Date().getFullYear();
        const start_Date = new Date(year, 0, 1);
        const end_Date = new Date(year, 11, 31, 23, 59, 59);

        const result = await pool.query({
            text: `
            SELECT 
                EXTRACT(MONTH FROM createdat) AS month,
                type,
                SUM(amount) AS totalAmount 
            FROM 
                tbltransaction 
            WHERE 
                user_id = $1 
                AND createdat BETWEEN $2 AND $3 
            GROUP BY 
                EXTRACT(MONTH FROM createdat), type`,
            values: [userId, start_Date, end_Date],
        });

        const data = new Array(12).fill().map((_, index) => {
            const monthData = result.rows.filter(
                (item) => parseInt(item.month) === index + 1
            );

            const income =
                monthData.find((item) => item.type === "income")?.totalamount || 0;

            const expense =
                monthData.find((item) => item.type === "expense")?.totalamount || 0;

            return {
                month: getMonthName(index),
                income,
                expense,
            };
        });

        // 5 giao dịch mới nhất
        const lastTransactionsResult = await pool.query({
            text: `SELECT * FROM tbltransaction WHERE user_id = $1 ORDER BY id DESC LIMIT 5`,
            values: [userId],
        });

        const lastTransactions = lastTransactionsResult.rows;

        // 4 tài khoản mới nhất
        const lastAccountResult = await pool.query({
            text: `SELECT * FROM tblaccount WHERE user_id = $1 ORDER BY id DESC LIMIT 4`,
            values: [userId],
        });

        const lastAccount = lastAccountResult.rows;

        return res.json({
            status: 200,
            availableBalance,
            totalIncome,
            totalExpense,
            chartData: data,
            lastTransactions,
            lastAccount,
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: error.message
        });
    }
};