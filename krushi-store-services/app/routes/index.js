(function (applicationsRoutes) {

    'use strict';

    applicationsRoutes.init = function (app) {
        var userRouter = require('./user.routes');
        app.use('/api/', userRouter);

        var supplierRouter = require('./supplier.routes');
        app.use('/api/', supplierRouter);

        var productRouter = require('./product.routes');
        app.use('/api/', productRouter);
    };
})(module.exports);
