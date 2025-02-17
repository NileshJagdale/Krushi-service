const Districts = require("../models/district.model.js");

// Create and Save a new district 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a district
  const district = new Districts({
    name: req.body.name
  });

  // Save district in the database
  Districts.create(district, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the district."
      });
    else res.send(data);
  });
};

// Retrieve all Districts from the database (with condition).
exports.findAll = (req, res) => {
  Districts.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    else res.send(data);
  });
};

// Find a single district by Id
exports.findOne = (req, res) => {
  Districts.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found district with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving district with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Districts
exports.getAllIsDeleted = (req, res) => {
  Districts.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Districts."
      });
    else res.send(data);
  });
};

// Update a district identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Districts.updateById(
    req.params.id,
    new Districts(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found district with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating district with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a district with the specified id in the request
exports.delete = (req, res) => {
  Districts.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found district with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete district with id " + req.params.id
        });
      }
    } else res.send({ message: `district was deleted successfully!` });
  });
};

// Delete all Districts from the database.
exports.deleteAll = (req, res) => {
  Districts.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Districts."
      });
    else res.send({ message: `All Districts were deleted successfully!` });
  });
};