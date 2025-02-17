const Villages = require("../models/village.model.js");

// Create and Save a new village 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a village
  const village = new Villages({
    name: req.body.name,
  });

  // Save village in the database
  Villages.create(village, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the village."
      });
    else res.send(data);
  });
};

// Retrieve all Villages from the database (with condition).
exports.findAll = (req, res) => {
  Villages.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    else res.send(data);
  });
};

// Find a single village by Id
exports.findOne = (req, res) => {
  Villages.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found village with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving village with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Villages
exports.getAllIsDeleted = (req, res) => {
  Villages.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Villages."
      });
    else res.send(data);
  });
};

// Update a village identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Villages.updateById(
    req.params.id,
    new Villages(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found village with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating village with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a village with the specified id in the request
exports.delete = (req, res) => {
  Villages.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found village with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete village with id " + req.params.id
        });
      }
    } else res.send({ message: `village was deleted successfully!` });
  });
};

// Delete all Villages from the database.
exports.deleteAll = (req, res) => {
  Villages.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Villages."
      });
    else res.send({ message: `All Villages were deleted successfully!` });
  });
};