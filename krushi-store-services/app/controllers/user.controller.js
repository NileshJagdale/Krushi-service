const Users = require("../models/user.model.js");

// Create and Save a new Users 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("Request Body:", req.body); // Debugging line

  
  const date = Date.now();
  // Create a Users
  const user = new Users({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  mobileNo: req.body.mobileNo,
  adharNo: req.body.adharNo,
  address: req.body.address,
  status: req.body.status,
  addedBy: req.body.addedBy,
  addedOn: new Date(date),
  isKycDone: req.body.isKycDone
  });

  // Save Users in the database
  Users.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all Userss from the database (with condition).
exports.findAll = (req, res) => {
  Users.getAll(req.query.isDeleted, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    else res.send(data);
  });
};

// Find a single Users by Id
exports.findOne = (req, res) => {
  Users.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Users with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Users with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Find a single Users by mobile
exports.findByMobile = (req, res) => {
  Users.findByMobile(req.params.mobile, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Users with mobile ${req.params.mobile}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Users with mobile " + req.params.mobile
        });
      }
    } else res.send(data);
  });
};

// find all published Userss
exports.getAllIsDeleted = (req, res) => {
  Users.getAllIsDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    else res.send(data);
  });
};

// Update a Users identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Users.updateById(
    req.params.id,
    new Users(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
  Users.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Users with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Users with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Users.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
