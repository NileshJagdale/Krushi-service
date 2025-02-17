const sql = require("./db.js");

// constructor
const OrderPayment = function (orderpayment) {
    this.orderId = orderpayment.orderId;
    this.userId = orderpayment.userId;
    this.amount = orderpayment.amount;
    this.paidDate = orderpayment.paidDate;
    this.paymentType = orderpayment.paymentType;
    this.status = orderpayment.status;
};

OrderPayment.create = (newOrderpayment, result) => {
  sql.query("INSERT INTO orderpayment SET ?", newOrderpayment, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newOrderpayment });
  });
};

OrderPayment.findById = (id, result) => {
  sql.query(`SELECT * FROM orderpayment WHERE orderpayment = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found orderpayment with the id
    result({ kind: "not_found" }, null);
  });
};

OrderPayment.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM orderpayment";

  if (isDeleted) {
    query += ` WHERE isDeleted LIKE '%${isDeleted}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

OrderPayment.getAllIsDeleted = result => {
  sql.query("SELECT * FROM orderpayment WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

OrderPayment.updateById = (id, orderpayment, result) => {
  sql.query(
    "UPDATE orderpayment SET orderId = ?, userId = ?, amount = ?, paidDate = ?, paymentType = ?, status = ? WHERE orderpayment = ?",
    [orderpayment.orderId, orderpayment.userId, orderpayment.amount, orderpayment.paidDate, orderpayment.paymentType, orderpayment.status, id],
    (err, res) => {
      if (err) {
        console.log(err)
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found orderpayment with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...orderpayment });
    }
  );
};

OrderPayment.remove = (id, result) => {
  sql.query("UPDATE orderpayment SET isDeleted = true WHERE orderpayment = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found orderpayment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

OrderPayment.removeAll = result => {
  sql.query("UPDATE orderpayment SET isDeleted = true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });      
};

module.exports = OrderPayment;