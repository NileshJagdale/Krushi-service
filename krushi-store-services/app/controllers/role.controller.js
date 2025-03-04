const Roles = require("../models/role.model.js");

// Create and Save a new role 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a role
  const role = new Roles({
    roleId: req.body.roleId,
    title: req.body.title
  });

  // Save role in the database
  Roles.create(role, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the role."
      });
    else res.send(data);
  });
};

// Retrieve all Roles from the database (with condition).
exports.findAll = (req, res) => {
  Roles.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    else res.send(data);
  });
};

// Find a single role by Id
exports.findOne = (req, res) => {
  Roles.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found role with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving role with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Roles
exports.getAllIsDeleted = (req, res) => {
  Roles.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Roles."
      });
    else res.send(data);
  });
};

// Update a role identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Roles.updateById(
    req.params.id,
    new Roles(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found role with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating role with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a role with the specified id in the request
exports.delete = (req, res) => {
  Roles.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found role with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete role with id " + req.params.id
        });
      }
    } else res.send({ message: `role was deleted successfully!` });
  });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  Roles.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Roles."
      });
    else res.send({ message: `All Roles were deleted successfully!` });
  });
};