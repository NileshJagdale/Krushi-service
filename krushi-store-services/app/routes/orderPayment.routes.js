var orderPaymentServerRoutes = (function () {
    'use strict';
  
    const orderpayment = require("../controllers/orderpayment.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new orderpayment
    router.post("/orderpayment", authenticateJWT, orderpayment.create);  
  
    // Retrieve all orderpayment
    router.get("/orderpayment", authenticateJWT, orderpayment.findAll);
  
    // Retrieve all deleted orderpayment
    router.get("/orderpayment/deleted", authenticateJWT, orderpayment.getAllIsDeleted);

    // Retrieve a single orderpayment with id
    router.get("/orderpayment/:id", authenticateJWT, orderpayment.findOne);

    // Update a orderpayment with id
    router.put("/orderpayment/:id", authenticateJWT, orderpayment.update);
  
    // Delete a orderpayment with id
    router.delete("/orderpayment/:id", authenticateJWT, orderpayment.delete);
  
    // Delete all product
    router.delete("/orderpayment", authenticateJWT, orderpayment.deleteAll);
  
    return router;
  
  })();
  
  module.exports = orderPaymentServerRoutes;