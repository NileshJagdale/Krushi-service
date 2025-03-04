const sql = require("./db.js");

// constructor
const Role = function (role) {
    this.roleId = role.roleId;
    this.title = role.title;
};

Role.create = (newRole, result) => {
  sql.query("INSERT INTO role_master SET ?", newRole, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newRole });
  });
};

Role.findById = (id, result) => {
  sql.query(`SELECT * FROM role_master WHERE roleId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found role with the id
    result({ kind: "not_found" }, null);
  });
};

Role.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM role_master";

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

// Role.getAllIsDeleted = result => {
//   sql.query("SELECT * FROM role_master WHERE isDeleted=true", (err, res) => {
//     if (err) {
//       result(null, err);
//       return;
//     }
//     result(null, res);
//   });
// };

Role.updateById = (id, role, result) => {
  sql.query(
    "UPDATE role_master SET title = ? WHERE roleId = ?",
    [role.title, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found role with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...role });
    }
  );
};

Role.remove = (id, result) => {
  sql.query("DELETE FROM role_master WHERE roleId = ?", id, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found role with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

Role.removeAll = result => {
  sql.query("DELETE FROM role_master", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Role;