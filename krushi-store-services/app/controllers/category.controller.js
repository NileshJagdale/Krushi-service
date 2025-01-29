const Categories = require("../models/category.model.js");

// Create and Save a new category 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a category
  const category = new Categories({
    name: req.body.name,
    shopId: req.body.shopId,
    status: req.body.status,
    addedOn: new Date(date),
    addedBy: req.body.addedBy,
  });

  // Save category in the database
  Categories.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the category."
      });
    else res.send(data);
  });
};

// Retrieve all categorys from the database (with condition).
exports.findAll = (req, res) => {
  Categories.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving category."
      });
    else res.send(data);
  });
};

// Find a single category by Id
exports.findOne = (req, res) => {
  Categories.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving category with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Categories
exports.getAllIsDeleted = (req, res) => {
  Categories.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categories."
      });
    else res.send(data);
  });
};

// Update a category identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Categories.updateById(
    req.params.id,
    new Categories(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found category with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating category with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
  Categories.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete category with id " + req.params.id
        });
      }
    } else res.send({ message: `category was deleted successfully!` });
  });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
  Categories.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Categories."
      });
    else res.send({ message: `All Categories were deleted successfully!` });
  });
};