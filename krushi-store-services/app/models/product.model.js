const sql = require("./db.js");

// constructor
const Product = function (product) {
    this.categoryId = product.categoryId;
    this.shopId = product.shopId;
    this.name = product.name;
    this.shortKey = product.shortKey;
    this.price = product.price;
    this.discountPrice = product.discountPrice;
    this.qty = product.qty;
    this.gst = product.gst;
    this.batchNo = product.batchNo;
    this.manufactureId = product.manufactureId;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (id, result) => {
  sql.query(`SELECT * FROM product WHERE productId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM product";

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

Product.getAllIsDeleted = result => {
  sql.query("SELECT * FROM product WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE product SET categoryId = ?, shopId = ?, name = ?, shortKey = ?, price = ?, discountPrice = ?, qty = ?, gst = ?, batchNo = ?, manufactureId = ? WHERE productId = ?",
    [product.categoryId, product.shopId, product.name, product.shortKey, product.price, product.discountPrice, product.qty, product.gst, product.batchNo, product.manufactureId, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...product });
    }
  );
};


Product.remove = (id, result) => {
  sql.query("UPDATE product SET isDeleted = true WHERE productId = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("UPDATE product SET isDeleted = true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Product;