const Products = require("../models/product.model.js");

// Create and Save a new product 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a product
  const product = new Products({
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

  // Save product in the database
  Products.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message: 
          err.message || "Some error occurred while creating the product."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  Products.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    else res.send(data);
  });
};

// Find a single product by Id
exports.findOne = (req, res) => {
  Products.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Products
exports.getAllIsDeleted = (req, res) => {
  Products.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    else res.send(data);
  });
};

// Update a product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Products.updateById(
    req.params.id,
    new Products(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
  Products.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.id
        });
      }
    } else res.send({ message: `product was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Products.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};