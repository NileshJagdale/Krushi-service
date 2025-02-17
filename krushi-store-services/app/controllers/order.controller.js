const Orders = require("../models/order.model.js");

// Create and Save a new order 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a order
  const order = new Orders({
    orderNo: req.body.orderNo,
    shopId: req.body.shopId,
    userId: req.body.userId,
    orderDate: new Date(date),
    orderStatus: req.body.orderStatus,
    totalAmount: req.body.totalAmount,
    amountPaid: req.body.amountPaid,
    balance: req.body.totalAmount - req.body.amountPaid
  });

  // Save order in the database
  Orders.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the order."
      });
    else res.send(data);
  });
};

// Retrieve all Orders from the database (with condition).
exports.findAll = (req, res) => {
  Orders.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving order."
      });
    else res.send(data);
  });
};

// Find a single order by Id
exports.findOne = (req, res) => {
  Orders.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving order with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Orders
exports.getAllIsDeleted = (req, res) => {
  Orders.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
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

  Orders.updateById(
    req.params.id,
    new Orders(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating order with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a order with the specified id in the request
exports.delete = (req, res) => {
  Orders.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete order with order " + req.params.id
        });
      }
    } else res.send({ message: `product was deleted successfully!` });
  });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Orders.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orders."
      });
    else res.send({ message: `All Orders were deleted successfully!` });
  });
};