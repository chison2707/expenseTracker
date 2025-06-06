import { pool } from "../config/database.js";

// [GET]/api/v1/accoutns/:userId
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

export const createAccount = async (req, res) => {
    try {
        const userId = req.params.userId;

        const { name, amount, account_number } = req.body;

        const accountExistQuery = {
            text: `SELECT * FROM tblaccount WHERE account_name = $1 AND user_id = $2`,
            values: [name, userId],
        };

        const accountExistResult = await pool.query(accountExistQuery);

        const accountExist = accountExistResult.rows[0];

        if (accountExist) {
            return res.json({
                status: 400,
                message: "Tài khoản ngân hàng đã được tạo!"
            });
        }

        const createAccountResult = await pool.query({
            text: `INSERT INTO tblaccount(user_id, account_name, account_number, account_balance) VALUES($1, $2, $3, $4) RETURNING *`,
            values: [userId, name, account_number, amount],
        });
        const account = createAccountResult.rows[0];

        const userAccounts = Array.isArray(name) ? name : [name];

        const updateUserAccountQuery = {
            text: `UPDATE tbluser SET accounts = array_cat(accounts, $1), updatedat = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
            values: [userAccounts, userId],
        };
        await pool.query(updateUserAccountQuery);

        const description = account.account_name + " (Tiền ban đầu)";

        const initialDepositQuery = {
            text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [
                userId,
                description,
                "income",
                "Completed",
                amount,
                account.account_name,
            ],
        };
        await pool.query(initialDepositQuery);

        res.json({
            status: 200,
            message: "Tạo tài khoản thành công!",
            data: account,
        });
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        });
    }
};