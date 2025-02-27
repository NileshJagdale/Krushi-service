const sql = require("./db.js");

// constructor
const Supplier = function (supplier) {
    this.storeId = supplier.storeId;
    this.gstNo = supplier.gstNo   
    this.gstStatus = supplier.gstStatus;
    this.stateJurisdiction = supplier.stateJurisdiction;
    this.stateOfSupplier = supplier.stateOfSupplier;
    this.name = supplier.name;
    this.address = supplier.address;
    this.contactPerson = supplier.contactPerson;
    this.contactNo = supplier.contactNo;
    this.email = supplier.email;
    this.status = supplier.status;
    this.addedBy = supplier.addedBy;
};

Supplier.create = (newSupplier, result) => {
  sql.query("INSERT INTO supplier SET ?", newSupplier, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newSupplier });
  });
};

Supplier.findById = (id, result) => {
  sql.query(`SELECT * FROM supplier WHERE supplierId = ${id}  AND status = 'Y'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found supplier with the id
    result({ kind: "not_found" }, null);
  });
};

Supplier.findByMobile = (mobile, result) => {
  sql.query(`SELECT * FROM supplier WHERE mobile = ${mobile} AND status = 'Y'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
    // not found supplier with the id
    result({ kind: "not_found" }, null);
  });
};

Supplier.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM supplier WHERE status = 'Y' ORDER BY name";

  if (isDeleted) {
    query += ` WHERE isDeleted LIKE '%${isDeleted}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Supplier.getAllIsDeleted = result => {
  sql.query("SELECT * FROM supplier WHERE status = 'D'", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Supplier.updateById = (id, supplier, result) => {
  sql.query(
    "UPDATE supplier SET gstNo = ?, gstStatus = ?, stateJurisdiction = ?, stateOfSupplier = ?, name = ?, address = ?, contactPerson = ?, contactNo = ?, email = ?, status= ?, addedBy = ? WHERE supplierId = ?",
    [supplier.gstNo, supplier.gstStatus, supplier.stateJurisdiction, supplier.stateOfSupplier ,supplier.name, supplier.address, supplier.contactPerson, supplier.contactNo, supplier.email, supplier.status, supplier.addedBy, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found supplier with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...supplier });
    }
  );
};

Supplier.remove = (id, result) => {
  sql.query("UPDATE supplier SET status = 'D' WHERE supplierId = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found supplier with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};


Supplier.removeAll = result => {
  sql.query("UPDATE supplier SET status = 'D'", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Supplier;