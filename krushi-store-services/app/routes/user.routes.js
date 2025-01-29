var userServerRoutes = (function () {
  'use strict';

  const user = require("../controllers/user.controller.js");
  const authController = require("../controllers/auth.controller.js");
  const authenticateJWT = require("./auth.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/user", authenticateJWT, user.create);
  // router.post("/user", user.create);


  // login user
  router.get("/login", authController.login);
  router.post("/send-otp", authController.sendOTP);
  router.post("/verify-otp", authController.verifyOTP);

  // Retrieve all user
  router.get("/user", authenticateJWT, user.findAll);

  // Retrieve all deleted user
  router.get("/user/deleted", authenticateJWT, user.getAllIsDeleted);

  // Retrieve a single user with id
  router.get("/user/:id", authenticateJWT, user.findOne);

  // Update a user with id
  router.put("/user/:id", authenticateJWT, user.update);

  // Delete a user with id
  router.delete("/user/:id", authenticateJWT, user.delete);

  // Delete all user
  router.delete("/user", authenticateJWT, user.deleteAll);

  return router;
})();

module.exports = userServerRoutes;