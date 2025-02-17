var manufactureServerRoutes = (function () {
    'use strict';
  
    const manufacture = require("../controllers/manufacture.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new manufacture
    router.post("/manufacture", authenticateJWT, manufacture.create);  
  
    // Retrieve all manufacture
    router.get("/manufacture", authenticateJWT, manufacture.findAll);
  
    // Retrieve all deleted manufacture
    router.get("/manufacture/deleted", authenticateJWT, manufacture.getAllIsDeleted);
manufacture
    // Retrieve a single manufacture with id
    router.get("/manufacture/:id", authenticateJWT, manufacture.findOne);

    // Update a manufacture with id
    router.put("/manufacture/:id", authenticateJWT, manufacture.update);
  
    // Delete a manufacture with id
    router.delete("/manufacture/:id", authenticateJWT, manufacture.delete);
  
    // Delete all manufactures
    router.delete("/manufacture", authenticateJWT, manufacture.deleteAll);
  
    return router;
  
  })();
  
  module.exports = manufactureServerRoutes;