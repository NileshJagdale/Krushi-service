const Suppliers = require("../models/supplier.model.js");

// Create and Save a new supplier 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a Supplier
  const supplier = new Suppliers({
    storeId: req.body.storeId,
    gstNo: req.body.gstNo,  
    gstStatus: req.body.gstStatus,
    stateJurisdiction: req.body.stateJurisdiction,
    stateOfSupplier: req.body.stateOfSupplier,
    name: req.body.name,
    address: req.body.address,
    contactPerson: req.body.contactPerson,
    contactNo: req.body.contactNo,
    email: req.body.email,
    status: req.body.status,
    addedBy: req.body.addedBy,
    addedOn: new Date(date),
  });

  // Save Suppliers in the database
  Suppliers.create(supplier, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the Suppliers."
      });
    else res.send(data);
  });
};

// Retrieve all Suppliers from the database (with condition).
exports.findAll = (req, res) => {

  Suppliers.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Supplier."
      });
    else res.send(data);
  });
};

// Find a single Suppliers by Id
exports.findOne = (req, res) => {
  Suppliers.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Supplier with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Suppliers with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Find a single supplier by mobile
exports.findByMobile = (req, res) => {
  Suppliers.findByMobile(req.params.mobile, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Suppliers with mobile ${req.params.mobile}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Suppliers with mobile " + req.params.mobile
        });
      }
    } else res.send(data);
  });
};

// find all published suppliers
exports.getAllIsDeleted = (req, res) => {
  Suppliers.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving suppliers."
      });
    else res.send(data);
  });
};

// Update a supplier identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Suppliers.updateById(
    req.params.id,
    new Suppliers(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found supplier with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating supplier with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a supplier with the specified id in the request
exports.delete = (req, res) => {
  Suppliers.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found supplier with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete supplier with id " + req.params.id
        });
      }
    } else res.send({ message: `supplier was deleted successfully!` });
  });
};

// Delete all suppliers from the database.
exports.deleteAll = (req, res) => {
  Suppliers.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all suppliers."
      });
    else res.send({ message: `All suppliers were deleted successfully!` });
  });
};