var orderServerRoutes = (function () {
    'use strict';
  
    const order = require("../controllers/order.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new order
    router.post("/order", authenticateJWT, order.create);  
  
    // Retrieve all order
    router.get("/order", authenticateJWT, order.findAll);
  
    // Retrieve all deleted order
    router.get("/order/deleted", authenticateJWT, order.getAllIsDeleted);

    // Retrieve a single order with id
    router.get("/order/:id", authenticateJWT, order.findOne);

    // Update a order with id
    router.put("/order/:id", authenticateJWT, order.update);
  
    // Delete a order with id
    router.delete("/order/:id", authenticateJWT, order.delete);
  
    // Delete all product
    router.delete("/order", authenticateJWT, order.deleteAll);
  
    return router;
  
  })();
  
  module.exports = orderServerRoutes;