const Manufactures = require("../models/manufacture.model.js");

// Create and Save a new manufacture 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a manufacture
  const manufacture = new Manufactures({
    categoryId: req.body.categoryId,
    shopId: req.body.shopId,
    name: req.body.name,
    shortKey: req.body.shortKey,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    qty: req.body.qty,
    gst: req.body.gst,
    batchNo: req.body.batchNo,
    manufactureId: req.body.manufactureId
  });

  // Save manufacture in the database
  Manufactures.create(manufacture, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the manufacture."
      });
    else res.send(data);
  });
};

// Retrieve all Manufactures from the database (with condition).
exports.findAll = (req, res) => {
  Manufactures.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    else res.send(data);
  });
};

// Find a single manufacture by Id
exports.findOne = (req, res) => {
  Manufactures.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found manufacture with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving manufacture with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Manufactures
exports.getAllIsDeleted = (req, res) => {
  Manufactures.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Manufactures."
      });
    else res.send(data);
  });
};

// Update a manufacture identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Manufactures.updateById(
    req.params.id,
    new Manufactures(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found manufacture with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating manufacture with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a manufacture with the specified id in the request
exports.delete = (req, res) => {
  Manufactures.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found manufacture with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete manufacture with id " + req.params.id
        });
      }
    } else res.send({ message: `manufacture was deleted successfully!` });
  });
};

// Delete all Manufactures from the database.
exports.deleteAll = (req, res) => {
  Manufactures.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Manufactures."
      });
    else res.send({ message: `All Manufactures were deleted successfully!` });
  });
};