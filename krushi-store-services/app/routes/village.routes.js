var villageServerRoutes = (function () {
    'use strict';
  
    const village = require("../controllers/village.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new village
    router.post("/village", authenticateJWT, village.create);  
  
    // Retrieve all village
    router.get("/village", authenticateJWT, village.findAll);
  
    // Retrieve all deleted village
    router.get("/village/deleted", authenticateJWT, village.getAllIsDeleted);

    // Retrieve a single village with id
    router.get("/village/:id", authenticateJWT, village.findOne);

    // Update a village with id
    router.put("/village/:id", authenticateJWT, village.update);
  
    // Delete a village with id
    router.delete("/village/:id", authenticateJWT, village.delete);
  
    // Delete all villages
    router.delete("/village", authenticateJWT, village.deleteAll);
  
    return router;
  
  })();
  
  module.exports = villageServerRoutes;