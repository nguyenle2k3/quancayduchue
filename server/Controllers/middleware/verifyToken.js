const jwt = require('./jwt');
const asyncHandler = require('express-async-handler');
const path = require('path');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req.cookies !== null) {
        const token = req.cookies['refreshToken'];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err)
                return res.status(401).json({
                    success: false,
                    mes: 'Invalid access token',
                });
            req.user = decode;
            next();
        });
    } else {
        res.status(401);
        return res.status(401).json({
            success: false,
            mes: 'Require authentication!!!',
        });
    }
});

module.exports = {
    verifyAccessToken,
    // isAdmin,
};
