const OrderPayment = require("../models/orderPayment.model");

// Create and Save a new order payment 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a order payment
  const orderPayment = new OrderPayment({
    orderId: req.body.orderId,
    userId: req.body.userId,
    amount: req.body.amount,
    paidDate: new Date(date),
    paymentType: req.body.paymentType,
    status: req.body.status,
  });

  // Save order payment in the database
  OrderPayment.create(orderPayment, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the order payment."
      });
    else res.send(data);
  });
};

// Retrieve all Order payment from the database (with condition).
exports.findAll = (req, res) => {
  OrderPayment.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving order payment."
      });
    else res.send(data);
  });
};

// Find a single order payment by Id
exports.findOne = (req, res) => {
  OrderPayment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving order payment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Order payment
exports.getAllIsDeleted = (req, res) => {
  OrderPayment.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order payment."
      });
    else res.send(data);
  });
};

// Update a order payment identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  OrderPayment.updateById(
    req.params.id,
    new OrderPayment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found order payment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating order payment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a order payment with the specified id in the request
exports.delete = (req, res) => {
  OrderPayment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order payment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete order payment with order " + req.params.id
        });
      }
    } else res.send({ message: `order payment was deleted successfully!` });
  });
};

// Delete all Order payment from the database.
exports.deleteAll = (req, res) => {
  OrderPayment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orderpayment."
      });
    else res.send({ message: `All Order payment were deleted successfully!` });
  });
};