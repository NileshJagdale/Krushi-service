const Orderitem = require("../models/orderItem.model.js");

// Create and Save a new orderitem 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a orderitem
  const orderitem = new Orderitem({
    orderId: req.body.orderId,
    productId: req.body.productId,
    qty: req.body.qty,
    price: req.body.price,
    total: req.body.qty * req.body.price,
    status: req.body.status,
    createdOn: req.body.createdOn
  });

  // Save orderitem in the database
  Orderitem.create(orderitem, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the orderitem."
      });
    else res.send(data);
  });
};

// Retrieve all Orderitem from the database (with condition).
exports.findAll = (req, res) => {
  Orderitem.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orderitem."
      });
    else res.send(data);
  });
};

// Find a single orderitem by Id
exports.findOne = (req, res) => {
  Orderitem.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found orderitem with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving orderitem with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Orderitem
exports.getAllIsDeleted = (req, res) => {
  Orderitem.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orderitem."
      });
    else res.send(data);
  });
};

// Update a orderitem identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Orderitem.updateById(
    req.params.id,
    new Orderitem(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found orderitem with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating orderitem with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a orderitem with the specified id in the request
exports.delete = (req, res) => {
  Orderitem.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found orderitem with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete orderitem with orderitem " + req.params.id
        });
      }
    } else res.send({ message: `product was deleted successfully!` });
  });
};

// Delete all Orderitem from the database.
exports.deleteAll = (req, res) => {
  Orderitem.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orderitem."
      });
    else res.send({ message: `All Orderitem were deleted successfully!` });
  });
};