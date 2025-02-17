const Orderpayment = require("../models/orderPayment.model");

// Create and Save a new orderpayment 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a orderpayment
  const orderpayment = new Orderpayment({
    orderId: req.body.orderId,
    userId: req.body.userId,
    amount: req.body.amount,
    paidDate: new Date(date),
    paymentType: req.body.paymentType,
    status: req.body.status,
  });

  // Save orderpayment in the database
  Orderpayment.create(orderpayment, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the orderpayment."
      });
    else res.send(data);
  });
};

// Retrieve all Orderpayment from the database (with condition).
exports.findAll = (req, res) => {
  Orderpayment.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orderpayment."
      });
    else res.send(data);
  });
};

// Find a single orderpayment by Id
exports.findOne = (req, res) => {
  Orderpayment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found orderpayment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving orderpayment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Orderpayment
exports.getAllIsDeleted = (req, res) => {
  Orderpayment.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orderpayment."
      });
    else res.send(data);
  });
};

// Update a order identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Orderpayment.updateById(
    req.params.id,
    new Orderpayment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found orderpayment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating orderpayment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a orderpayment with the specified id in the request
exports.delete = (req, res) => {
  Orderpayment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found orderpayment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete orderpayment with order " + req.params.id
        });
      }
    } else res.send({ message: `product was deleted successfully!` });
  });
};

// Delete all Orderpayment from the database.
exports.deleteAll = (req, res) => {
  Orderpayment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orderpayment."
      });
    else res.send({ message: `All Orderpayment were deleted successfully!` });
  });
};