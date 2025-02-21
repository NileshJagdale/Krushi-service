var orderItemServerRoutes = (function () {
    'use strict';
  
    const orderitem = require("../controllers/orderitem.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new orderitem
    router.post("/orderitem", authenticateJWT, orderitem.create);  
  
    // Retrieve all orderitem
    router.get("/orderitem", authenticateJWT, orderitem.findAll);
  
    // Retrieve all deleted orderitem
    router.get("/orderitem/deleted", authenticateJWT, orderitem.getAllIsDeleted);

    // Retrieve a single orderitem with id
    router.get("/orderitem/:id", authenticateJWT, orderitem.findOne);

    // Update a orderitem with id
    router.put("/orderitem/:id", authenticateJWT, orderitem.update);
  
    // Delete a orderitem with id
    router.delete("/orderitem/:id", authenticateJWT, orderitem.delete);
  
    // Delete all orderitem
    router.delete("/orderitem", authenticateJWT, orderitem.deleteAll);
  
    return router;
  
  })();
  
  module.exports = orderItemServerRoutes;