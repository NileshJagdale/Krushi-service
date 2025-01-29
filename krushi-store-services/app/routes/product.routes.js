var productServerRoutes = (function () {
    'use strict';
  
    const product = require("../controllers/product.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new product
    router.post("/product", authenticateJWT, product.create);  
  
    // Retrieve all product
    router.get("/product", authenticateJWT, product.findAll);
  
    // Retrieve all deleted product
    router.get("/product/deleted", authenticateJWT, product.getAllIsDeleted);

    // Retrieve a single product with id
    router.get("/product/:id", authenticateJWT, product.findOne);

    // Update a product with id
    router.put("/product/:id", authenticateJWT, product.update);
  
    // Delete a product with id
    router.delete("/product/:id", authenticateJWT, product.delete);
  
    // Delete all product
    router.delete("/product", authenticateJWT, product.deleteAll);
  
    return router;
  
  })();
  
  module.exports = productServerRoutes;