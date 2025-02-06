import db from "../config/db.js";

// CREATE PRODUCT VARIATION
export const createProductVariations = (req, res) => {
  const { id, product_id, color_id, size_id, stock, price } = req.body;
  const data = [id, product_id, color_id, size_id, stock, price];
  if (!product_id || !color_id || !size_id || !stock || !price) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const sql =
      "insert into product_variations(id, product_id, color_id, size_id, stock, price) values(?,?,?,?,?,?)";
    db.query(sql, data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      return res
        .status(201)
        .json({ message: "Product variations added successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET ALL PRODUCT VARIATIONS OR ( WITH PAGE AND LIMIT QUERY )
export const allProductVariations = (req, res) => {
  const { page, limit } = req.query;
  try {
    let sql = "select * from product_variations";
    let values = [];
    if (page && limit) {
      let offset = (page - 1) * limit;
      sql += " limit ? offset ?";
      values.push(parseInt(limit), parseInt(offset));
    }
    db.query(sql, values, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Product variations not found!" });
      }
      return res.status(200).json({ product_variations: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET PRODUCT VARIATIONS BY ID
export const getProductVariationsById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Product variations id is required!" });
  }
  try {
    const sql = "select * from product_variations where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Product variations not found!" });
      }
      return res.status(200).json({ product_variations: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// UPDATE PRODUCT VARIATIONS
export const updateProductVariations = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Product Variations id is required!" });
  }
  if (!updates || Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: "At least one field is required for update!" });
  }

  try {
    let sql = "update product_variations set ";
    let values = [];

    // Construct query dynamically
    const fields = Object.keys(updates).map((key) => {
      values.push(updates[key]);
      return `${key} = ?`;
    });

    sql += fields.join(", ");
    sql += " where id = ?";
    values.push(id);

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Product variations not found!" });
      }
      return res
        .status(200)
        .json({ message: "Product variations updated successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// FILTER PRODUCTS
export const filterProductVariations = async (req, res) => {
  const {
    price_min,
    price_max,
    stock_min,
    stock_max,
    size,
    color,
    sort_by,
    order,
    page,
    limit,
  } = req.query;

  try {
    let sql = "select * from product_variations where 1";
    const values = [];

    if (price_min) {
      sql += " and price >= ?";
      values.push(parseFloat(price_min));
    }
    if (price_max) {
      sql += " and price <= ?";
      values.push(parseFloat(price_max));
    }
    if (stock_min) {
      sql += " and stock >= ?";
      values.push(parseInt(stock_min));
    }
    if (stock_max) {
      sql += " and stock <= ?";
      values.push(parseInt(stock_max));
    }
    if (size) {
      sql += " and size_id = ?";
      values.push(size);
    }
    if (color) {
      sql += " and color_id = ?";
      values.push(color);
    }

    // Sorting
    const validSortFields = ["price", "stock"];
    const validOrder = ["ASC", "DESC"];

    if (sort_by && validSortFields.includes(sort_by)) {
      const orderBy = validOrder.includes(order?.toUpperCase())
        ? order.toUpperCase()
        : "ASC";
      sql += ` order by ${sort_by} ${orderBy}`;
    }

    // Pagination
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const offset = (pageNumber - 1) * pageSize;

    if (
      (pageSize && offset) ||
      (!isNaN(parseInt(pageSize)) && !isNaN(parseInt(offset)))
    ) {
      sql += " limit ? offset ?";
      values.push(pageSize, offset);
    }

    db.query(sql, values, async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Product variations not found" });
      }
      return res.status(200).json({ product_variations: results });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// DELETE PRODUCT VARIATIONS
export const deleteProductVariations = (req, res) => {
  const { id } = req.params;

  try {
    const sql = "delete from product_variations where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Product variations not found!" });
      }
      return res
        .status(200)
        .json({ message: "Product variations deleted successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};
