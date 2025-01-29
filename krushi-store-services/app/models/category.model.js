const sql = require("./db.js");

// constructor
const Category = function (category) {
    this.name = category.name;
    this.shopId = category.shopId;
    this.status = category.status;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO product_categories SET ?", newCategory, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.findById = (id, result) => {
  sql.query(`SELECT * FROM product_categories WHERE categoryId = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = (isDeleted, result) => {
  let query = "SELECT * FROM product_categories";

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

Category.getAllIsDeleted = result => {
  sql.query("SELECT * FROM product_categories WHERE isDeleted=true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE product_categories SET name = ?, shopId = ? WHERE categoryId = ?",
    [category.name, category.shopId, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found category with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("UPDATE product_categories SET isDeleted = true WHERE categoryId = ?", id, (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found category with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

Category.removeAll = result => {
  sql.query("UPDATE product_categories SET isDeleted = true", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Category;