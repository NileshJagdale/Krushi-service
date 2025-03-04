const Stores = require("../models/store.model.js");

// Create and Save a new store 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a store
  const store = new Stores({
    gstNo: req.body.gstNo,
    gstVerifiedDate: req.body.gstVerifiedDate,
    name: req.body.name,
    address: req.body.address,
    districtId: req.body.districtId,
    villageId: req.body.villageId,
    shopActLicense: req.body.shopActLicense,
    fertilizerLicense: req.body.fertilizerLicense,
    pesticideLicense: req.body.pesticideLicense,
    ownerId: req.body.ownerId,
    status: req.body.status,
    addedBy: req.body.addedBy,
    addedOn: new Date(date)
  });

  // Save store in the database
  Stores.create(store, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the store."
      });
    else res.send(data);
  });
};

// Retrieve all Stores from the database (with condition).
exports.findAll = (req, res) => {
  Stores.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    else res.send(data);
  });
};

// Find a single store by Id
exports.findOne = (req, res) => {
  Stores.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving store with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Stores
exports.getAllIsDeleted = (req, res) => {
  Stores.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Stores."
      });
    else res.send(data);
  });
};

// Update a store identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Stores.updateById(
    req.params.id,
    new Stores(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found store with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating store with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a store with the specified id in the request
exports.delete = (req, res) => {
  Stores.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found store with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete store with id " + req.params.id
        });
      }
    } else res.send({ message: `store was deleted successfully!` });
  });
};

// Delete all Stores from the database.
exports.deleteAll = (req, res) => {
  Stores.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Stores."
      });
    else res.send({ message: `All Stores were deleted successfully!` });
  });
};