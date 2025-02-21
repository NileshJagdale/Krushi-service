var districtServerRoutes = (function () {
    'use strict';
  
    const district = require("../controllers/district.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new district
    router.post("/district", authenticateJWT, district.create);  
  
    // Retrieve all district
    router.get("/district", authenticateJWT, district.findAll);
  
    // Retrieve all deleted district
    router.get("/district/deleted", authenticateJWT, district.getAllIsDeleted);

    // Retrieve a single district with id
    router.get("/district/:id", authenticateJWT, district.findOne);

    // Update a district with id
    router.put("/district/:id", authenticateJWT, district.update);
  
    // Delete a district with id
    router.delete("/district/:id", authenticateJWT, district.delete);
  
    // Delete all districts
    router.delete("/district", authenticateJWT, district.deleteAll);
  
    return router;
  
  })();
  
  module.exports = districtServerRoutes;