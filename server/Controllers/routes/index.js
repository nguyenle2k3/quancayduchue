const adminRouter = require('./admin');
const clientRouter = require('./client');
const { notFound, errHandler } = require('../middleware/errHandler');

const initRoutes = (app) => {
    app.use('/api/admin', adminRouter);
    app.use('/client', clientRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
