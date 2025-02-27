const sql = require("./db.js");

// constructor
const Product = function (product) {
    this.productCategoryId = product.productCategoryId;
    this.storeId = product.storeId;
    this.name = product.name;
    this.shortKey = product.shortKey;
    this.price = product.price;
    this.discountPrice = product.discountPrice;
    // this.qty = product.qty;
    this.gst = product.gst;
    this.batchNo = product.batchNo;
    this.manufactureDate = product.manufactureDate;
    this.expiryDate = product.expiryDate;
    this.status = product.status;
    this.addedBy = product.addedBy;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (id, result) => {
  sql.query(`SELECT * FROM products WHERE productId = ${id} AND status = 'Y'`, (err, res) => {
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
  let query = "SELECT * FROM products WHERE status = 'Y' ORDER BY name";

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
  sql.query("SELECT * FROM products WHERE status = 'D'", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE products SET productCategoryId = ?, storeId = ?, name = ?, shortKey = ?, price = ?, discountPrice = ?, gst = ?, batchNo = ?, manufactureDate = ?, expiryDate = ?, status = ?, addedBy = ? WHERE productId = ?",
    [product.productCategoryId, product.storeId, product.name, product.shortKey, product.price, product.discountPrice, product.gst, product.batchNo, product.manufactureDate, product.expiryDate, product.status, product.addedBy, id],
    (err, res) => {
      if (err) {
        console.log(err)
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
  sql.query("UPDATE products SET status = 'D' WHERE productId = ?", id, (err, res) => {
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
  sql.query("UPDATE products SET status = 'D'", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Product;