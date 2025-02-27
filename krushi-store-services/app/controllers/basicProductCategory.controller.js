const basicProductCategories = require("../models/basicProductCategory.model.js");

// Create and Save a new basicProductCategory 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line


  const date = Date.now();
  // Create a basicProductCategory
  const basicProductCategory = new basicProductCategories({
    name: req.body.name,
    status: req.body.status,
    addedBy: req.body.addedBy,
    addedOn: new Date(date),
  });

  // Save basicProductCategory in the database
  basicProductCategories.create(basicProductCategory, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the basicProductCategory."
      });
    else res.send(data);
  });
};

// Retrieve all basicProductCategories from the database (with condition).
exports.findAll = (req, res) => {
  basicProductCategories.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving basicProductCategory."
      });
    else res.send(data);
  });
};

// Find a single basicProductCategory by Id
exports.findOne = (req, res) => {
  basicProductCategories.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found basicProductCategory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving basicProductCategory with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published basicProductCategories
exports.getAllIsDeleted = (req, res) => {
  basicProductCategories.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving basicProductCategories."
      });
    else res.send(data);
  });
};

// Update a basicProductCategory identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  basicProductCategories.updateById(
    req.params.id,
    new basicProductCategories(req.body),
    (err, data) => {
      if (err) {
        console.log(err)
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found basicProductCategory with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating basicProductCategory with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a basicProductCategory with the specified id in the request
exports.delete = (req, res) => {
  basicProductCategories.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found basicProductCategory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete basicProductCategory with id " + req.params.id
        });
      }
    } else res.send({ message: `basicProductCategory was deleted successfully!` });
  });
};

// Delete all basicProductCategories from the database.
exports.deleteAll = (req, res) => {
  basicProductCategories.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all basicProductCategories."
      });
    else res.send({ message: `All basicProductCategories were deleted successfully!` });
  });
};