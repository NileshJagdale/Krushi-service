const sql = require("./db.js");

// constructor
const Manufacture = function (manufacture) {
    this.name = manufacture.name;
    this.status = manufacture.status;
};

Manufacture.create = (newManufacture, result) => {
  sql.query("INSERT INTO manufacture SET ?", newManufacture, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newManufacture });
  });
};

Manufacture.findById = (id, result) => {
  sql.query(`SELECT * FROM manufacture WHERE manufactureId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found manufacture with the id
    result({ kind: "not_found" }, null);
  });
};

Manufacture.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM manufacture";

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

Manufacture.getAllIsDeleted = result => {
  sql.query("SELECT * FROM manufacture WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Manufacture.updateById = (id, manufacture, result) => {
  sql.query(
    "UPDATE manufacture SET name = ?, status = ? WHERE manufactureId = ?",
    [manufacture.name, manufacture.status, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found manufacture with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...manufacture });
    }
  );
};

Manufacture.remove = (id, result) => {
  sql.query("UPDATE manufacture SET isDeleted = true WHERE manufactureId = ?", id, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found manufacture with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

Manufacture.removeAll = result => {
  sql.query("UPDATE manufacture SET isDeleted = true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Manufacture;