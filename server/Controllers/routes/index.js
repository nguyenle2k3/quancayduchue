const adminRouter = require('./admin');
const clientRouter = require('./client');
const productRouter = require('./product');
const promotionRouter = require('./promotion');
const { notFound, errHandler } = require('../middleware/errHandler');

const initRoutes = (app) => {
    app.use('/api/product', productRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/promotion', productRouter);
    app.use('/client', clientRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
