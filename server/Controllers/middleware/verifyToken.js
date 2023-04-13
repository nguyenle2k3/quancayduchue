const jwt = require('./jwt');
const asyncHandler = require('express-async-handler');
const path = require('path');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    // Bearer token
    // headers: { authorization: Bearer token}
    // console.log(req.cookies);
    // if (req?.headers?.authorization?.startsWith('Bearer')) {
    if (req.cookies !== null) {
        // const token = req.headers.authorization.split(' ')[1];
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
        // return res.sendFile(path.join(__dirname, '../../Views/views/404.html'));
        // return res.redirect('/api/admin/');
    }
});

// const isAdmin = asyncHandler(async (req, res, next) => {
//     console.log(req.user);
//     const { role } = req.user;
//     if (role !== 'admin') {
//         return res.status(401).json({
//             success: false,
//             mes: 'Require Admin Role !',
//         });
//     }
//     next();
// });

module.exports = {
    verifyAccessToken,
    // isAdmin,
};
