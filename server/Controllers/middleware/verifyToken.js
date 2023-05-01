// const jwt = require('./jwt');
// const asyncHandler = require('express-async-handler');
// const path = require('path');

// // const verifyAccessToken = asyncHandler(async (req, res, next) => {
// //     if (req.cookies !== null) {
// //         const token = req.cookies['refreshToken'];
// //         jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
// //             if (err) {
// //                 // res.sendFile(path.join(__dirname, '../../Views/views/login.html'));
// //                 return res.status(401).json({
// //                     success: false,
// //                     mes: 'Invalid access token',
// //                 });
// //                 // throw new Error(err);
// //             }
// //             req.user = decode;
// //             next();
// //         });
// //     } else {
// //         // res.status(401);
// //         return res.status(401).json({
// //             success: false,
// //             mes: 'Require authentication!!!',
// //         });
// //     }
// // });
// const verifyAccessToken = asyncHandler(async (req, res, next) => {
//     if (req.cookies !== null) {
//         const token = req.cookies['refreshToken'];
//         jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 return next({ status: 401, message: 'Invalid access token' });
//             }
//             req.user = decode;
//             next();
//         });
//     } else {
//         return res.status(401).json({
//             success: false,
//             mes: 'Require authentication!!!',
//         });
//     }
// });

// module.exports = {
//     verifyAccessToken,
//     // isAdmin,
// };
const jwt = require('./jwt');
const asyncHandler = require('express-async-handler');
const path = require('path');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req.cookies !== null) {
        const token = req.cookies['refreshToken'];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                // Pass the error to the error handling middleware
                return next(new Error('Invalid access token'));
            }
            req.user = decode;
            next();
        });
    } else {
        // Pass the error to the error handling middleware
        return next(new Error('Require authentication!!!'));
    }
});

module.exports = {
    verifyAccessToken,
    // isAdmin,
};
