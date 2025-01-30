const sql = require("./db.js");

// constructor
const Order = function (order) {
    this.orderNo = order.orderNo;
    this.shopId = order.shopId;
    this.userId = order.userId;
    this.orderStatus = order.orderStatus;
    this.totalAmount = order.totalAmount;
    this.amountPaid = order.amountPaid;
};

Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.findById = (id, result) => {
  sql.query(`SELECT * FROM orders WHERE orderId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found order with the id
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM orders";

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

Order.getAllIsDeleted = result => {
  sql.query("SELECT * FROM orders WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE orders SET orderNo = ?, shopId = ?, userId = ?, orderStatus = ?, totalAmount = ?, amountPaid = ? WHERE orderId = ?",
    [order.orderNo, order.shopId, order.userId, order.orderStatus, order.totalAmount, order.amountPaid, id],
    (err, res) => {
      if (err) {
        console.log(err)
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found order with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...order });
    }
  );
};


Order.remove = (id, result) => {
  sql.query("UPDATE orders SET isDeleted = true WHERE orderId = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found order with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Order.removeAll = result => {
  sql.query("UPDATE orders SET isDeleted = true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Order;