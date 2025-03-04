const OrderItem = require("../models/orderItem.model.js");

// Create and Save a new order item 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a order item
  const orderItem = new OrderItem({
    orderId: req.body.orderId,
    productId: req.body.productId,
    qty: req.body.qty,
    price: req.body.price,
    total: req.body.qty * req.body.price,
    status: req.body.status,
    createdOn: new Date(date)
  });

  // Save order item in the database
  OrderItem.create(orderItem, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the order item."
      });
    else res.send(data);
  });
};

// Retrieve all Order item from the database (with condition).
exports.findAll = (req, res) => {
  OrderItem.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving order item."
      });
    else res.send(data);
  });
};

// Find a single order item by Id
exports.findOne = (req, res) => {
  OrderItem.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order item with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving order item with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Order item
exports.getAllIsDeleted = (req, res) => {
  OrderItem.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order item."
      });
    else res.send(data);
  });
};

// Update a order item identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  OrderItem.updateById(
    req.params.id,
    new OrderItem(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found order item with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating order item with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a order item with the specified id in the request
exports.delete = (req, res) => {
  OrderItem.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order item with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete order item with order Item " + req.params.id
        });
      }
    } else res.send({ message: `order item was deleted successfully!` });
  });
};

// Delete all Order item from the database.
exports.deleteAll = (req, res) => {
  OrderItem.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Order Item."
      });
    else res.send({ message: `All Order item were deleted successfully!` });
  });
};