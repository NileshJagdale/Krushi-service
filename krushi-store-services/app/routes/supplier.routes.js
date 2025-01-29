var supplierServerRoutes = (function () {
    'use strict';
  
    const supplier = require("../controllers/supplier.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new supplier
    router.post("/supplier", authenticateJWT, supplier.create);  
  
    // Retrieve all supplier
    router.get("/supplier", authenticateJWT, supplier.findAll);
  
    // Retrieve all deleted supplier
    router.get("/supplier/deleted", authenticateJWT, supplier.getAllIsDeleted);

    // Retrieve a single supplier with id
    router.get("/supplier/:id", authenticateJWT, supplier.findOne);

    // Retrieve a single supplier with mobile
    router.get("/suppliers/:id", authenticateJWT, supplier.findByMobile);

    // Update a supplier with id
    router.put("/supplier/:id", authenticateJWT, supplier.update);
  
    // Delete a supplier with id
    router.delete("/supplier/:id", authenticateJWT, supplier.delete);
  
    // Delete all supplier
    router.delete("/supplier", authenticateJWT, supplier.deleteAll);
  
    return router;
  
  })();
  
  module.exports = supplierServerRoutes;