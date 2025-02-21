const sql = require("./db.js");

// constructor
const User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.mobileNo = user.mobileNo;
  this.adharNo = user.adharNo;
  this.address = user.address;
  this.status = user.status;
  this.addedBy = user.addedBy;
  this.isKycDone = user.isKycDone;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user_master SET ?", newUser, (err, res) => {
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
  sql.query(`SELECT * FROM user_master WHERE userId = ${id}`, (err, res) => {
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
  sql.query(`SELECT * FROM user_master WHERE mobileNo = ${mobile}`, (err, res) => {
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
  sql.query(`SELECT * FROM user_master WHERE mobileNo = ${params.mobile} AND password = "${params.password}"`, (err, res) => {
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
  let query = "SELECT * FROM user_master";

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
  sql.query("SELECT * FROM user_master WHERE isDeleted=true", (err, res) => {
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
    "UPDATE user_master SET firstName = ?, lastName = ?, mobileNo = ?, adharNo = ?, address = ?, status = ? WHERE userId = ?",
    [user.firstName, user.lastName, user.mobileNo, user.adharNo, user.address, user.status, id],
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
  sql.query("UPDATE user_master SET isDeleted = true WHERE userId = ?", id, (err, res) => {
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
  sql.query("UPDATE user_master SET isDeleted = true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = User;