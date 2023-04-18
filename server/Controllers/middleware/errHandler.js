const path = require('path');
const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    // res.status(404);
    // next(error);
    res.sendFile(path.join(__dirname, '../../Views/views/404.html'));
};

const errHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
        success: false,
        mes: error?.message,
    });
};

module.exports = {
    notFound,
    errHandler,
};
