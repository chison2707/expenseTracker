import { pool } from "../config/database.js";
import { getMonthName } from "../helpers/month.js";
import paginationHelper from "../helpers/pagination.js";

//[GET] /api/v1/transactions
export const getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();

        const _sevenDaysAgo = new Date(today);

        _sevenDaysAgo.setDate(today.getDate() - 7);

        const sevenDaysAgo = _sevenDaysAgo.toISOString().split("T")[0];

        const { df, dt, s, page = 1, limit = 10 } = req.query;

        const startDate = new Date(df || sevenDaysAgo);
        const endDate = new Date(dt || new Date());

        const countResult = await pool.query({
            text: `
                SELECT COUNT(*) FROM tbltransaction 
                WHERE user_id = $1 AND (
                    createdat BETWEEN $2 AND $3 
                    OR description ILIKE '%' || $4 || '%' 
                    OR status ILIKE '%' || $4 || '%' 
                    OR source ILIKE '%' || $4 || '%'
                )
            `,
            values: [userId, startDate, endDate, s]
        });

        const total = parseInt(countResult.rows[0].count);
        let objPagination = paginationHelper(
            {
                currentPage: 1,
                limitItems: 10
            },
            { page, limit },
            total
        );
        //end pagination

        const transactionResult = await pool.query({
            text: `
                SELECT * FROM tbltransaction 
                WHERE user_id = $1 AND (
                    createdat BETWEEN $2 AND $3 
                    OR description ILIKE '%' || $4 || '%' 
                    OR status ILIKE '%' || $4 || '%' 
                    OR source ILIKE '%' || $4 || '%'
                )
                ORDER BY id DESC 
                LIMIT $5 OFFSET $6
            `,
            values: [userId, startDate, endDate, s, objPagination.limitItems, objPagination.skip]
        });

        return res.json({
            status: 200,
            message: "Lấy thông tin giao dịch thành công!",
            data: transactionResult.rows,
            totalPage: objPagination.totalPage
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
            text: `SELECT type, SUM(amount) AS totalAmount FROM tbltransaction WHERE user_id = $1 GROUP BY type`,
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

// [POST]/api/v1/transactions/addTransaction/:accountId
export const addTransaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const accountId = req.params.accountId;
        const { description, source, amount } = req.body;

        const result = await pool.query({
            text: `SELECT * FROM tbltransaction WHERE id = $1`,
            values: [accountId],
        });

        const accountInfo = result.rows[0];

        if (!accountInfo) {
            return res.json({
                status: 400,
                message: "Không tìm thấy tài khoản"
            });
        }

        if (accountInfo.account_balance <= 0 || accountInfo.account_balance < parseInt(amount)) {
            return res.json({
                status: 400,
                message: "Số dư tài khoản không đủ!"
            });
        }

        // Begin Transaction
        await pool.query("BEGIN");

        await pool.query({
            text: `UPDATE tblaccount SET account_balance = account_balance - $1, updatedat = CURRENT_TIMESTAMP WHERE id = $2`,
            values: [parseInt(amount), accountId],
        });

        await pool.query({
            text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) VALUES($1, $2, $3, $4, $5, $6)`,
            values: [userId, description, "expense", "Completed", amount, source],
        });

        await pool.query("COMMIT");

        return res.json({
            status: 200,
            message: "Giao dịch thành công!",
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: error.message
        });
    }
}

// [PATCH]/api/v1/transactions/transferMoney
export const tranferMoney = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fromAccount, toAccount } = req.body;
        const amount = parseInt(req.body.amount);

        const fromAccResult = await pool.query({
            text: `SELECT * FROM tblaccount WHERE id = $1`,
            values: [fromAccount],
        });

        const fromAcc = fromAccResult.rows[0];

        if (!fromAcc) {
            return res.json({
                status: 400,
                message: "Thông tin tài khoản không hợp lệ!"
            });
        }

        if (amount > fromAcc.account_balance) {
            return res.json({
                status: 400,
                message: "Thông tin tài khoản không hợp lệ!"
            });
        }

        await pool.query("BEGIN");

        await pool.query({
            text: `UPDATE tblaccount SET account_balance = account_balance - $1, updatedat = CURRENT_TIMESTAMP WHERE id = $2`,
            values: [amount, fromAccount],
        });

        const toAcc = await pool.query({
            text: `UPDATE tblaccount SET account_balance = account_balance + $1, updatedat = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
            values: [amount, toAccount],
        });

        const description = `Chuyển tiền từ (${fromAcc.account_name} sang ${toAcc.rows[0].account_name})`;

        await pool.query({
            text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) VALUES($1, $2, $3, $4, $5, $6)`,
            values: [
                userId,
                description,
                "expense",
                "Completed",
                amount,
                fromAcc.account_name,
            ],
        });

        const description1 = `Nhận tiền từ (${fromAcc.account_name} sang ${toAcc.rows[0].account_name})`;

        await pool.query({
            text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) VALUES($1, $2, $3, $4, $5, $6)`,
            values: [
                userId,
                description1,
                "income",
                "Completed",
                amount,
                toAcc.rows[0].account_name,
            ],
        });

        await pool.query("COMMIT");

        return res.json({
            status: 200,
            message: "Giao dịch thành công!",
        });

    } catch (error) {
        return res.json({
            status: 500,
            message: error.message
        });
    }
}