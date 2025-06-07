export const transaction = (req, res, next) => {
    const errors = [];
    if (!req.body.description) {
        errors.push('Vui lòng nhập chi tiết giao dịch!');
    }
    if (!req.body.source) {
        errors.push('Vui lòng nhập nguồn giao dịch!');
    }
    if (!req.body.amount) {
        errors.push('Vui lòng nhập số tiền!');
    }

    if (parseInt(req.body.amount) <= 0) {
        errors.push('Vui lòng nhập số tiền lớn hơn 0!');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }
    next();
}

export const tranferMoneyVld = (req, res, next) => {
    const errors = [];
    if (!req.body.fromAccount) {
        errors.push('Vui lòng nhập tài khoản cần chuyển!');
    }
    if (!req.body.toAccount) {
        errors.push('Vui lòng nhập tài khoản nhận tiền!');
    }
    if (!req.body.amount) {
        errors.push('Vui lòng nhập số tiền!');
    }

    if (parseInt(req.body.amount) <= 0) {
        errors.push('Vui lòng nhập số tiền lớn hơn 0!');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }
    next();
}