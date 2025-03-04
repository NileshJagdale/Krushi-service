var basicProductCategoryServerRoutes = (function () {
    'use strict';
  
    const basicProductCategory = require("../controllers/basicProductCategory.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new basicProductCategory
    router.post("/basicProductCategory", authenticateJWT, basicProductCategory.create);  
  
    // Retrieve all basicProductCategory
    router.get("/basicProductCategory", authenticateJWT, basicProductCategory.findAll);
  
    // Retrieve all deleted basicProductCategory
    router.get("/basicProductCategory/deleted", authenticateJWT, basicProductCategory.getAllIsDeleted);

    // Retrieve a single basicProductCategory with id
    router.get("/basicProductCategory/:id", authenticateJWT, basicProductCategory.findOne);

    // Update a basicProductCategory with id
    router.put("/basicProductCategory/:id", authenticateJWT, basicProductCategory.update);
  
    // Delete a basicProductCategory with id
    router.delete("/basicProductCategory/:id", authenticateJWT, basicProductCategory.delete);
  
    // Delete all basicProductCategory
    router.delete("/basicProductCategory", authenticateJWT, basicProductCategory.deleteAll);
  
    return router;
  
  })();
  
  module.exports = basicProductCategoryServerRoutes;