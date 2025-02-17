const sql = require("./db.js");

// constructor
const District = function (district) {
    this.name = district.name;
};

District.create = (newDistrict, result) => {
  sql.query("INSERT INTO district SET ?", newDistrict, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newDistrict });
  });
};

District.findById = (id, result) => {
  sql.query(`SELECT * FROM district WHERE districtId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found district with the id
    result({ kind: "not_found" }, null);
  });
};

District.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM district";

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

District.getAllIsDeleted = result => {
  sql.query("SELECT * FROM district WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

District.updateById = (id, district, result) => {
  sql.query(
    "UPDATE district SET name = ? WHERE districtId = ?",
    [district.name, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found district with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...district });
    }
  );
};

District.remove = (id, result) => {
  sql.query("UPDATE district SET isDeleted = true WHERE districtId = ?", id, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found district with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

District.removeAll = result => {
  sql.query("UPDATE district SET isDeleted = true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = District;