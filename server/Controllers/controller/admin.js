const Admin = require('../../Models/models/admin');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../../utils/sendMail');
const crypto = require('crypto');
const path = require('path');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            mes: 'Thiếu Đầu Vào',
        });
    }
    // if have admin register with this email
    const admin = await Admin.findOne({ email: email });
    if (admin) {
        throw new Error('Email Đã Đăng Ký !');
    } else {
        const newUser = await Admin.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser
                ? 'Đăng Ký Thành Công. Vui Lòng Đăng Nhập Lại.'
                : 'Có Lỗi Xảy Ra, Vui Lòng Liên Hệ Lại NguyenLe!',
        });
    }
});

// refreshToken chỉ để cấp mới accessToken
// accessToken dùng để xác thực người dùng, phân quyền người dùng
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: 'Thiếu Đầu Vào',
            email: email,
            password: password,
        });
    }
    const response = await Admin.findOne({ email: email });

    if (response && (await response.isCorrectPassword(password))) {
        // Tách password và role ra khỏi response
        const { password, role, refreshToken, ...userData } = response.toObject();
        // Tạo accessToken
        const accessToken = generateAccessToken(response._id, role);
        // Tạo refreshToken
        const newRefreshToken = generateRefreshToken(response._id);
        // Lưu refreshToken vào database
        await Admin.findByIdAndUpdate(
            response._id,
            { refreshToken: newRefreshToken },
            { new: true }
        );
        // Lưu refreshToken vào cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        // return res.redirect('/api/admin/');
        return res.status(200).json({
            success: true,
            mes: 'Successfully !',
        });
    } else {
        res.status(401).json({ success: false, message: 'Sai Email Hoặc Mật Khẩu' });
    }
});
const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.admin;
    const admin = await Admin.findById(_id).select('-refreshToken -password -role');
    return res.status(200).json({
        success: admin ? true : false,
        result: admin ? admin : 'Không Tìm Thấy ADMIN',
    });
});

const refreshAccessToken = asyncHandler(async function (req, res) {
    // Lấy refresh token từ cookies
    const cookie = req.cookies;
    // Check xem có token không
    if (!cookie && !cookie.refreshToken) {
        throw new Error('No refresh token in cookies !');
    }
    // Check token có hợp lệ không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await Admin.findOne({
        _id: rs._id,
        refreshToken: cookie.refreshToken,
    });
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response
            ? generateAccessToken(response._id, response.role)
            : 'Refresh token Không Trùng Khớp !',
    });
});

const logout = asyncHandler(async function (req, res) {
    const cookie = req.cookies;

    // Check xem có đang ở trạng thái đăng nhập không
    if (!cookie || !cookie.refreshToken) {
        throw new Error('No refresh token in cookies');
    }

    // Xoá refresh token trong database
    await Admin.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        { refreshToken: '' },
        { new: true }
    );
    // console.log(req.cookies);

    // Xoá refresh token ở cookies browser
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        mes: 'Đã Đăng Xuất !',
    });
});

// Client gửi email
// Server check email có hợp lệ không => Gửi mail + kèm theo link (password change token)
// Báo cho phía client check mail => click link
// Client gửi một api kèm theo token
// Check token có giống cái server đã gửi không
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
    // Lấy email
    const { email } = req.query;
    // Nếu không có email
    if (!email) throw new Error('Không Có email');
    // Nếu có, tìm email trong db và gán vào admin
    const admin = await Admin.findOne({ email });
    // Nếu không thấy admin trùng email
    if (!admin) throw new Error('Không Tìm Thấy ADMIN!');
    const resetToken = admin.createPasswordChangeToken();
    // Sau khi dùng hàm tự định nghĩa trong db thì phải gọi hàm save() để lưu data
    await admin.save();

    const html = `Xin vui lòng click vào đường link dưới đây để thay đổi mật khẩu. Link này sẽ hết hạn sau 15 phút. <a href=${process.env.URL_SERVER}/api/admin/resetpassword/${resetToken}>Click Here</a>`;
    const data = {
        email,
        html,
    };
    const rs = await sendMail(data);
    return res.status(200).json({
        success: true,
        rs,
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;
    if (!password || !token) throw new Error('Thiếu Đầu Vào !');
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const admin = await Admin.findOne({
        passwordResetToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!admin) throw new Error('Invalid reset password token !');
    admin.password = password;
    admin.passwordResetToken = undefined;
    admin.passwordChangedAt = Date.now();
    admin.passwordResetExpires = undefined;
    await admin.save();
    return res.status(200).json({
        success: admin ? true : false,
        mes: admin ? 'Updated !' : 'Something went wrong !',
    });
});
const renderAdminPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../Views/views/admin.html'));
};

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    renderAdminPage,
};
