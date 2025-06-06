import { pool } from "../config/database.js";
import { comparePassword, hashPassword } from "../helpers/password.js";
import { generateRandomString } from "../helpers/token.js";

// [POST]/api/v1/users/register
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, country, currency } = req.body;

        const userExist = await pool.query({
            text: "SELECT EXISTS (SELECT * FROM tbluser WHERE email = $1)",
            values: [email]
        });

        if (userExist.rows[0].exists) {
            return res.json({
                status: 400,
                message: "Địa chỉ email đã tồn tại!"
            });
        }

        const hashedPassword = await hashPassword(password);
        const tokenUser = generateRandomString(10);

        const user = await pool.query({
            text: `
                INSERT INTO tbluser (firstName, lastName, email,phone_number,country, password, tokenuser, currency)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `,
            values: [firstName, lastName, email, phoneNumber, country, hashedPassword, tokenUser, currency]
        });

        res.json({
            status: 200,
            message: "Đăng ký tài khoản thành công!",
            user: user.rows[0]
        })

    } catch (error) {
        return res.json({
            status: 500,
            message: error.message
        })
    }
}

// [POST]/api/v1/users/login
export const loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query({
            text: "SELECT * FROM tbluser WHERE email = $1",
            values: [email],
        });

        const user = result.rows[0];

        if (!user) {
            return res.json({
                status: 400,
                message: "Địa chỉ email không đúng",
            });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.json({
                status: 400,
                message: "Mật khẩu không đúng!",
            });
        }
        const token = user.tokenuser;
        res.cookie("tokenUser", token);

        res.json({
            code: 200,
            message: "Đăng nhập thành công",
            token: token,
        });

    } catch (error) {
        return res.json({
            status: 500,
            message: error.message
        })
    }
}

// [GET]/api/v1/users/detail
export const detail = async (req, res) => {
    res.json({
        code: 200,
        message: "Lấy thông tin thành công!",
        infor: req.user
    });
};

// [PATCH]/api/v1/users/changePass/:userId
export const changePassword = async (req, res) => {
    try {
        const userId = req.params.userId;

        const { currentPassword, newPassword, confirmPassword } = req.body;

        console.log(currentPassword, newPassword, confirmPassword);

        const userExist = await pool.query({
            text: `SELECT * FROM tbluser WHERE id = $1`,
            values: [userId],
        });

        const user = userExist.rows[0];

        if (!user) {
            return res.json({
                status: 400,
                message: "Không tìm thấy user"
            });
        }

        const isMatch = await comparePassword(currentPassword, user.password);

        if (!isMatch) {
            return res.json({
                status: 400,
                message: "Mật khẩu mới giống với mật khẩu cũ"
            });
        }

        const hashedPassword = await hashPassword(newPassword);

        await pool.query({
            text: `UPDATE tbluser SET password = $1 WHERE id = $2`,
            values: [hashedPassword, userId],
        });

        return res.json({
            status: 200,
            message: "Thay đổi mật khẩu thành công!",
        });
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        });
    }
};

// [PATCH]/api/v1/users/edit/:userId
export const editController = async (req, res) => {
    try {
        const userId = req.params.userId;

        const { firstName, lastName, phoneNumber, country, currency } = req.body;

        const updatedUser = await pool.query({
            text: `UPDATE tbluser SET firstName = $1, lastName = $2, country = $3, currency = $4, phone_number = $5, 
            updatedat = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`,
            values: [firstName, lastName, country, currency, phoneNumber, userId],
        });

        return res.json({
            status: 200,
            message: "Thay đổi thông tin thành công!",
            infor: updatedUser
        });
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        });
    }
};