const sql = require("./db.js");

// constructor
const Supplier = function (supplier) {
    this.name = supplier.name;
    this.shopId = supplier.shopId;
    this.pointOfContact = supplier.pointOfContact;
    this.mobile = supplier.mobile;
    this.email = supplier.email;
    this.status = supplier.status;
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
  sql.query(`SELECT * FROM supplier WHERE supplierId = ${id}`, (err, res) => {
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
  sql.query(`SELECT * FROM supplier WHERE mobile = ${mobile}`, (err, res) => {
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
  let query = "SELECT * FROM supplier";

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
  sql.query("SELECT * FROM supplier WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Supplier.updateById = (id, supplier, result) => {
  sql.query(
    "UPDATE supplier SET name = ?, shopId = ?, pointOfContact = ?, mobile = ?, email = ?, status= ? WHERE supplierId = ?",
    [supplier.name, supplier.shopId, supplier.pointOfContact, supplier.mobile, supplier.email, supplier.status, id],
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
  sql.query("UPDATE supplier SET isDeleted = true WHERE supplierId = ?", id, (err, res) => {
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
  sql.query("UPDATE supplier SET isDeleted = true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Supplier;