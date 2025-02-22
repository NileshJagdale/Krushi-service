var storeServerRoutes = (function () {
    'use strict';
  
    const store = require("../controllers/store.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new store
    router.post("/store", authenticateJWT, store.create);  
  
    // Retrieve all store
    router.get("/store", authenticateJWT, store.findAll);
  
    // Retrieve all deleted store
    router.get("/store/deleted", authenticateJWT, store.getAllIsDeleted);

    // Retrieve a single store with id
    router.get("/store/:id", authenticateJWT, store.findOne);

    // Update a store with id
    router.put("/store/:id", authenticateJWT, store.update);
  
    // Delete a store with id
    router.delete("/store/:id", authenticateJWT, store.delete);
  
    // Delete all stores
    router.delete("/store", authenticateJWT, store.deleteAll);
  
    return router;
  
  })();
  
  module.exports = storeServerRoutes;