var orderPaymentServerRoutes = (function () {
    'use strict';
  
    const orderPayment = require("../controllers/orderPayment.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new orderPayment
    router.post("/orderPayment", authenticateJWT, orderPayment.create);  
  
    // Retrieve all orderPayment
    router.get("/orderPayment", authenticateJWT, orderPayment.findAll);
  
    // Retrieve all deleted orderPayment
    router.get("/orderPayment/deleted", authenticateJWT, orderPayment.getAllIsDeleted);

    // Retrieve a single orderPayment with id
    router.get("/orderPayment/:id", authenticateJWT, orderPayment.findOne);

    // Update a orderPayment with id
    router.put("/orderPayment/:id", authenticateJWT, orderPayment.update);
  
    // Delete a orderPayment with id
    router.delete("/orderPayment/:id", authenticateJWT, orderPayment.delete);
  
    // Delete all product
    router.delete("/orderPayment", authenticateJWT, orderPayment.deleteAll);
  
    return router;
  
  })();
  
  module.exports = orderPaymentServerRoutes;