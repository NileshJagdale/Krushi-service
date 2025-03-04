const sql = require("./db.js");

// constructor
const BasicProductCategory = function (basicProductCategory) {
    this.name = basicProductCategory.name;
    this.status = basicProductCategory.status;
    this.addedBy = basicProductCategory.addedBy
};

BasicProductCategory.create = (newBasicProductCategory, result) => {
  sql.query("INSERT INTO basic_product_category SET ?", newBasicProductCategory, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newBasicProductCategory });
  });
};

BasicProductCategory.findById = (id, result) => {
  sql.query(`SELECT * FROM basic_product_category WHERE categoryId = ${id} AND status = 'Y'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found basicProductCategory with the id
    result({ kind: "not_found" }, null);
  });
};

BasicProductCategory.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM basic_product_category WHERE status = 'Y'";

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

BasicProductCategory.getAllIsDeleted = result => {
  sql.query("SELECT * FROM basic_product_category WHERE status = 'D'", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

BasicProductCategory.updateById = (id, basicProductCategory, result) => {
  sql.query(
    "UPDATE basic_product_category SET name = ?, status = ?, addedBy = ?  WHERE categoryId = ?",
    [basicProductCategory.name, basicProductCategory.status, basicProductCategory.addedBy, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found basicProductCategory with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...basicProductCategory });
    }
  );
};

BasicProductCategory.remove = (id, result) => {
  sql.query("UPDATE basic_product_category SET status = 'D' WHERE categoryId = ?", id, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found basicProductCategory with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

BasicProductCategory.removeAll = result => {
  sql.query("UPDATE basic_product_category SET status = 'D'", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = BasicProductCategory;