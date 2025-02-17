const sql = require("./db.js");

// constructor
const OrderItem = function (orderitem) {
    this.orderId = orderitem.orderId;
    this.productId = orderitem.productId;
    this.qty = orderitem.qty;
    this.total = orderitem.total;
    this.status = orderitem.status;
    this.createdOn = orderitem.createdOn
};

OrderItem.create = (newOrderitem, result) => {
  sql.query("INSERT INTO orderitem SET ?", newOrderitem, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newOrderitem });
  });
};

OrderItem.findById = (id, result) => {
  sql.query(`SELECT * FROM orderitem WHERE orderitem = ${id}`, (err, res) => {
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
  let query = "SELECT * FROM orderitem";

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
  sql.query("SELECT * FROM orderitem WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

OrderItem.updateById = (id, orderitem, result) => {
  sql.query(
    "UPDATE orderitem SET orderId = ?, productId = ?, qty = ?, price = ?, total = ?, status = ? WHERE orderitem = ?",
    [orderitem.orderId, orderitem.productId, orderitem.qty, orderitem.price, orderitem.total, orderitem.status, id],
    (err, res) => {
      if (err) {
        console.log(err)
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found orderitem with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...orderitem });
    }
  );
};


OrderItem.remove = (id, result) => {
  sql.query("UPDATE orderitem SET isDeleted = true WHERE orderitem = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found orderitem with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

OrderItem.removeAll = result => {
  sql.query("UPDATE orderitem SET isDeleted = true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = OrderItem;