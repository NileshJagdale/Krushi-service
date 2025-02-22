(function (applicationsRoutes) {

    'use strict';

    applicationsRoutes.init = function (app) {
        var userRouter = require('./user.routes');
        app.use('/api/', userRouter);

        var roleRouter = require('./role.routes');
        app.use('/api/', roleRouter);

        var supplierRouter = require('./supplier.routes');
        app.use('/api/', supplierRouter);

        var productRouter = require('./product.routes');
        app.use('/api/', productRouter);

        var storeRouter = require('./store.routes');
        app.use('/api/', storeRouter);

        var manufactureRouter = require('./manufacture.routes');
        app.use('/api/', manufactureRouter);

        var villageRouter = require('./village.routes');
        app.use('/api/', villageRouter);

        var districtRouter = require('./district.routes');
        app.use('/api/', districtRouter);

        var categoryRouter = require('./category.routes');
        app.use('/api/', categoryRouter);

        var orderRouter = require('./order.routes');
        app.use('/api/', orderRouter);

        var orderItemRouter = require('./orderItem.routes');
        app.use('/api/', orderItemRouter);

        var orderPaymentRouter = require('./orderPayment.routes');
        app.use('/api/', orderPaymentRouter);

    };
})(module.exports);
