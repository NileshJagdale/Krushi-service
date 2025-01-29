var categoryServerRoutes = (function () {
    'use strict';
  
    const category = require("../controllers/category.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new category
    router.post("/category", authenticateJWT, category.create);  
  
    // Retrieve all category
    router.get("/category", authenticateJWT, category.findAll);
  
    // Retrieve all deleted category
    router.get("/category/deleted", authenticateJWT, category.getAllIsDeleted);

    // Retrieve a single category with id
    router.get("/category/:id", authenticateJWT, category.findOne);

    // Update a category with id
    router.put("/category/:id", authenticateJWT, category.update);
  
    // Delete a category with id
    router.delete("/category/:id", authenticateJWT, category.delete);
  
    // Delete all category
    router.delete("/category", authenticateJWT, category.deleteAll);
  
    return router;
  
  })();
  
  module.exports = categoryServerRoutes;