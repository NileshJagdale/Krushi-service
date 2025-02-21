const sql = require("./db.js");

// constructor
const Village = function (village) {
    this.name = village.name;
};

Village.create = (newVillage, result) => {
  sql.query("INSERT INTO village SET ?", newVillage, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newVillage });
  });
};

Village.findById = (id, result) => {
  sql.query(`SELECT * FROM village WHERE villageId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found village with the id
    result({ kind: "not_found" }, null);
  });
};

Village.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM village";

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

Village.getAllIsDeleted = result => {
  sql.query("SELECT * FROM village WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Village.updateById = (id, village, result) => {
  sql.query(
    "UPDATE village SET name = ? WHERE villageId = ?",
    [village.name, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found village with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...village });
    }
  );
};

Village.remove = (id, result) => {
  sql.query("UPDATE village SET isDeleted = true WHERE villageId = ?", id, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found village with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

Village.removeAll = result => {
  sql.query("UPDATE village SET isDeleted = true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Village;