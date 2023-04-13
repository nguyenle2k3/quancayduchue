const jwt = require('jsonwebtoken');

const generateAccessToken = function (uid, role) {
    return jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });
};
const generateRefreshToken = function (uid) {
    return jwt.sign({ _id: uid }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    sign: jwt.sign,
    verify: jwt.verify,
};
