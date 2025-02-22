var roleServerRoutes = (function () {
    'use strict';
  
    const role = require("../controllers/role.controller.js");
    const authenticateJWT = require("./auth.js");
  
    var router = require("express").Router();
  
    // Create a new role
    router.post("/role", authenticateJWT, role.create);  
  
    // Retrieve all role
    router.get("/role", authenticateJWT, role.findAll);
  
    // // Retrieve all deleted role
    // router.get("/role/deleted", authenticateJWT, role.getAllIsDeleted);

    // Retrieve a single role with id
    router.get("/role/:id", authenticateJWT, role.findOne);

    // Update a role with id
    router.put("/role/:id", authenticateJWT, role.update);
  
    // Delete a role with id
    router.delete("/role/:id", authenticateJWT, role.delete);
  
    // Delete all roles
    router.delete("/role", authenticateJWT, role.deleteAll);
  
    return router;
  
  })();
  
  module.exports = roleServerRoutes;