const sql = require("./db.js");

// constructor
const OrderItem = function (orderItem) {
    this.orderId = orderItem.orderId;
    this.productId = orderItem.productId;
    this.qty = orderItem.qty;
    this.price = orderItem.price;
    this.total = orderItem.total;
    this.status = orderItem.status;
    this.createdOn = orderItem.createdOn
};

OrderItem.create = (newOrderItem, result) => {
  sql.query("INSERT INTO order_item SET ?", newOrderItem, (err, res) => {
    if (err) {
      result(err, null);
      console.log(err)
      return;
    }

    result(null, { id: res.insertId, ...newOrderItem });
  });
};

OrderItem.findById = (id, result) => {
  sql.query(`SELECT * FROM order_item WHERE orderItemId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found orderitem with the id
    result({ kind: "not_found" }, null);
  });
};

OrderItem.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM order_item";

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

OrderItem.getAllIsDeleted = result => {
  sql.query("SELECT * FROM order_item WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

OrderItem.updateById = (id, orderItem, result) => {
  sql.query(
    "UPDATE order_item SET orderId = ?, productId = ?, qty = ?, price = ?, total = ?, status = ? WHERE orderItemId = ?",
    [orderItem.orderId, orderItem.productId, orderItem.qty, orderItem.price, orderItem.total, orderItem.status, id],
    (err, res) => {
      if (err) {
        console.log(err)
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found orderItem with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...orderItem });
    }
  );
};


OrderItem.remove = (id, result) => {
  sql.query("UPDATE order_item SET isDeleted = true WHERE orderItemId = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found orderItem with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

OrderItem.removeAll = result => {
  sql.query("UPDATE order_item SET isDeleted = true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = OrderItem;