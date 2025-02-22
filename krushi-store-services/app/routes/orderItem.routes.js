var orderItemServerRoutes = (function () {
    'use strict';
  
    const orderItem = require("../controllers/orderItem.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new orderItem
    router.post("/orderItem", authenticateJWT, orderItem.create);  
  
    // Retrieve all orderItem
    router.get("/orderItem", authenticateJWT, orderItem.findAll);
  
    // Retrieve all deleted orderItem
    router.get("/orderItem/deleted", authenticateJWT, orderItem.getAllIsDeleted);

    // Retrieve a single orderItem with id
    router.get("/orderItem/:id", authenticateJWT, orderItem.findOne);

    // Update a orderItem with id
    router.put("/orderItem/:id", authenticateJWT, orderItem.update);
  
    // Delete a orderItem with id
    router.delete("/orderItem/:id", authenticateJWT, orderItem.delete);
  
    // Delete all orderItem
    router.delete("/orderItem", authenticateJWT, orderItem.deleteAll);
  
    return router;
  
  })();
  
  module.exports = orderItemServerRoutes;