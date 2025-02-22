const sql = require("./db.js");

// constructor
const OrderPayment = function (orderPayment) {
    this.orderId = orderPayment.orderId;
    this.userId = orderPayment.userId;
    this.amount = orderPayment.amount;
    this.paidDate = orderPayment.paidDate;
    this.paymentType = orderPayment.paymentType;
    this.status = orderPayment.status;
};

OrderPayment.create = (newOrderPayment, result) => {
  sql.query("INSERT INTO order_payment SET ?", newOrderPayment, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newOrderPayment });
  });
};

OrderPayment.findById = (id, result) => {
  sql.query(`SELECT * FROM order_payment WHERE orderPaymentId = ${id}`, (err, res) => {
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
  let query = "SELECT * FROM order_payment";

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
  sql.query("SELECT * FROM order_payment WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

OrderPayment.updateById = (id, orderPayment, result) => {
  sql.query(
    "UPDATE order_payment SET orderId = ?, userId = ?, amount = ?, paidDate = ?, paymentType = ?, status = ? WHERE orderPaymentId = ?",
    [orderPayment.orderId, orderPayment.userId, orderPayment.amount, orderPayment.paidDate, orderPayment.paymentType, orderPayment.status, id],
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
      result(null, { id: id, ...orderPayment });
    }
  );
};

OrderPayment.remove = (id, result) => {
  sql.query("UPDATE order_payment SET isDeleted = true WHERE orderPaymentId = ?", id, (err, res) => {
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
  sql.query("UPDATE order_payment SET isDeleted = true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });      
};

module.exports = OrderPayment;