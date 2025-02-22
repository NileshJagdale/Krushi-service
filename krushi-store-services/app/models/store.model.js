const sql = require("./db.js");

// constructor
const Store = function (store) {
    this.gstNo = store.gstNo;
    this.gstVerifiedDate = store.gstVerifiedDate;
    this.name = store.name;
    this.address = store.address;
    this.districtId = store.districtId;
    this.villageId = store.villageId;
    this.shopActLicense = store.shopActLicense;
    this.fertilizerLicense = store.fertilizerLicense;
    this.pesticideLicense = store.pesticideLicense;
    this.ownerId = store.ownerId;
    this.status = store.status;
    this.addedBy = store.addedBy;
};

Store.create = (newStore, result) => {
  sql.query("INSERT INTO store SET ?", newStore, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newStore });
  });
};

Store.findById = (id, result) => {
  sql.query(`SELECT * FROM store WHERE storeId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found store with the id
    result({ kind: "not_found" }, null);
  });
};

Store.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM store";

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

Store.getAllIsDeleted = result => {
  sql.query("SELECT * FROM store WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Store.updateById = (id, store, result) => {
  sql.query(
    "UPDATE store SET gstNo = ?, gstVerifiedDate = ?, name = ?, address = ?, districtId = ?, villageId = ?, shopActLicense = ?, fertilizerLicense = ?, pesticideLicense = ?, ownerId = ?, status = ?, addedBy = ? WHERE storeId = ?",
    [store.gstNo, store.gstVerifiedDate, store.name, store.address, store.districtId, store.villageId, store.shopActLicense, store.fertilizerLicense, store.pesticideLicense, store.ownerId, store.status, store.addedBy, id],
    (err, res) => {
      if (err) {
        console.log(err)
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found store with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...store });
    }
  );
};

Store.remove = (id, result) => {
  sql.query("UPDATE store SET isDeleted = true WHERE storeId = ?", id, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found store with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

Store.removeAll = result => {
  sql.query("UPDATE store SET isDeleted = true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Store;