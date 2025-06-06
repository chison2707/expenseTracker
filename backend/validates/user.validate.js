export const registerPost = (req, res, next) => {
    const errors = [];
    if (!req.body.firstName) {
        errors.push('Vui lòng nhập tên của bạn!');
    }
    if (!req.body.lastName) {
        errors.push('Vui lòng nhập họ của bạn!');
    }
    if (!req.body.email) {
        errors.push('Vui lòng nhập email!');
    }
    if (!req.body.phoneNumber) {
        errors.push('Vui lòng nhập số điện thoại!');
    }
    if (!req.body.country) {
        errors.push('Vui lòng nhập đất nước của bạn!');
    }
    if (!req.body.currency) {
        errors.push('Vui lòng nhập đơn vị tiền tệ!');
    }
    if (!req.body.password) {
        errors.push('Vui lòng nhập mật khẩu!');
    }

    if (!req.body.confirmPassword) {
        errors.push('Vui lòng xác nhận lại mật khẩu!');
    }

    if (req.body.password != req.body.confirmPassword) {
        errors.push('Xác nhận mật khẩu không trùng khớp');
    }

    if (req.body.password.length < 6) {
        errors.push('Mật khẩu phải có ít nhất 6 ký tự!');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }
    next();
}

export const login = (req, res, next) => {
    const errors = [];
    if (!req.body.email) {
        errors.push('Vui lòng nhập email!');
    }
    if (!req.body.password) {
        errors.push('Vui lòng nhập mật khẩu!');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }
    next();
}

export const changePass = (req, res, next) => {
    const errors = [];
    if (!req.body.currentPassword) {
        errors.push('Vui lòng nhập mật khẩu hiện tại!');
    }
    if (!req.body.newPassword) {
        errors.push('Vui lòng nhập mật khẩu mới!');
    }
    if (!req.body.confirmPassword) {
        errors.push('Vui lòng nhập xác nhận lại mật khẩu mới!');
    }
    if (req.body.currentPassword === req.body.newPassword) {
        errors.push('Mật khẩu mới phải khác mật khẩu cũ!');
    }
    if (req.body.newPassword != req.body.confirmPassword) {
        errors.push('Xác nhận mật khẩu không trùng khớp');
    }

    if (req.body.newPassword.length < 6) {
        errors.push('Mật khẩu mới phải có ít nhất 6 ký tự!');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }
    next();
}

export const editUser = (req, res, next) => {
    const errors = [];
    if (!req.body.firstName) {
        errors.push('Vui lòng nhập tên của bạn!');
    }
    if (!req.body.lastName) {
        errors.push('Vui lòng nhập họ của bạn!');
    }
    if (!req.body.phoneNumber) {
        errors.push('Vui lòng nhập số điện thoại!');
    }
    if (!req.body.country) {
        errors.push('Vui lòng nhập đất nước của bạn!');
    }
    if (!req.body.currency) {
        errors.push('Vui lòng nhập đơn vị tiền tệ!');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }
    next();
}