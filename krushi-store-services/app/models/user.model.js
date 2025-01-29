const sql = require("./db.js");

// constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.address = user.address;
  this.role = user.role;
  this.mobile = user.mobile;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

// User.findByIdOrMobile = (id, result) => {
//   sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       result(null, res[0]);
//       return;
//     }
//   })

//   sql.query(`SELECT * FROM user WHERE mobile = ${mobile}`, (err, res) => {
//     if (err) {
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       result(null, res[0]);
//       return;
//     }
//     // not found user with the id
//     result({ kind: "not_found" }, null);
//   });
// };

User.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByMobile = (mobile, result) => {
  sql.query(`SELECT * FROM user WHERE mobile = ${mobile}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByMobileOrPassword = (params, result) => {
  sql.query(`SELECT * FROM user WHERE mobile = ${params.mobile} AND password = "${params.password}"`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM user WHERE isDeleted = false";

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

User.getAllIsDeleted = result => {
  sql.query("SELECT * FROM user WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  console.log(user);
  if (user.role === undefined){
    user.role = user.role ?? User.role;
  };
  console.log(user.role);
  console.log(user);
  sql.query(
    "UPDATE user SET name = ?, address = ?, mobile = ?, email = ?, password = ?, role = ? WHERE id = ?",
    [user.name, user.address, user.mobile, user.email, user.password, user.role, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("UPDATE user SET isDeleted = true WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("UPDATE user SET isDeleted = true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = User;