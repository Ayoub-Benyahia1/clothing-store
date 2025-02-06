import db from "../config/db.js";

const allowedFields = [
  "id",
  "name",
  "description",
  "price",
  "stock",
  "category_id",
  "brand",
  "gender",
  "material",
  "images",
  "created_at",
];

// CREATE PRODUCT
export const createProduct = (req, res) => {
  const {
    id,
    name,
    description,
    price,
    stock,
    category_id,
    brand,
    gender,
    material,
  } = req.body;
  const data = [
    id,
    name,
    description,
    price,
    stock,
    category_id,
    brand,
    gender,
    material,
  ];
  if (!name || !description || !price || !stock || !brand || !gender) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const sql =
      "insert into products(id, name, description, price, stock, category_id, brand, gender, material) values(?,?,?,?,?,?,?,?,?)";
    db.query(sql, data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      return res.status(201).json({ message: "Product added successfullt" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET ALL PRODUCTS OR ( WITH PAGE AND LIMIT QUERY )
export const allProducts = (req, res) => {
  const { page, limit } = req.query;
  try {
    let sql = "select * from products";
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
        return res.status(404).json({ message: "Products not found!" });
      }
      return res.status(200).json({ products: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET PRODUCT BY ID
export const getProductById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product id is required!" });
  }
  try {
    const sql = "select * from products where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Product not found!" });
      }
      return res.status(200).json({ product: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET SPECIFIC PRODUCT FIELDS
export const specificProductFields = (req, res) => {
  const { fields } = req.body;
  const { limit } = req.query;

  if (fields.length === 0 || !Array.isArray(fields)) {
    return res
      .status(400)
      .json({ message: "At least one field is required to get product!" });
  }
  try {
    const selectedFields = fields.filter((field) =>
      allowedFields.includes(field)
    );
    if (selectedFields.length === 0) {
      return res.status(400).json({ message: "Invalid fields provided!" });
    }
    let sql = `select ${selectedFields.join(
      ", "
    )} from products order by created_at desc`;

    let values = [];
    if (limit && !isNaN(parseInt(limit)) && parseInt(limit) > 0) {
      sql += " LIMIT ?";
      values.push(parseInt(limit));
    }

    db.query(sql, values, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Products not found!" });
      }
      return res.status(200).json({ products: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// UPDATE PRODUCT
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ message: "Product id is required!" });
  }
  if (!updates || Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: "At least one field is required for update!" });
  }

  try {
    let sql = "update products set ";
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
        return res.status(404).json({ message: "Product not found!" });
      }
      return res.status(200).json({ message: "Product updated successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// FILTER PRODUCTS
export const filterProducts = async (req, res) => {
  const {
    category,
    price_min,
    price_max,
    brand,
    gender,
    sort_by,
    order,
    page,
    limit,
  } = req.query;

  try {
    let sql = "select * from products where 1";
    const values = [];

    if (category) {
      sql += " and category_id = ?";
      values.push(category);
    }
    if (price_min) {
      sql += " and price >= ?";
      values.push(parseFloat(price_min));
    }
    if (price_max) {
      sql += " and price <= ?";
      values.push(parseFloat(price_max));
    }
    if (brand) {
      sql += " and brand = ?";
      values.push(brand);
    }
    if (gender) {
      sql += " and gender = ?";
      values.push(gender);
    }

    // Sorting
    const validSortFields = ["price", "rating", "created_at"];
    const validOrder = ["ASC", "DESC"];

    if (sort_by && validSortFields.includes(sort_by)) {
      const orderBy = validOrder.includes(order?.toUpperCase())
        ? order.toUpperCase()
        : "ASC";
      sql += ` ORDER BY ${sort_by} ${orderBy}`;
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
        return res.status(404).json({ message: "Products not found" });
      }
      return res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// GET PRODUCTS BY CATEGORY WITH PAGINATION
export const getProductsByCategory = (req, res) => {
  const { id } = req.params;
  const { fields } = req.body;
  const { limit, page } = req.query;

  if (!Array.isArray(fields) || fields.length === 0) {
    return res.status(400).json({
      message: "At least one field is required to get products by category",
    });
  }

  try {
    const selectedFields = fields.filter((field) =>
      allowedFields.includes(field)
    );

    if (selectedFields.length === 0) {
      return res.status(400).json({ message: "Invalid fields provided!" });
    }

    let sql = `SELECT ${selectedFields.join(
      ", "
    )} FROM products WHERE category_id = ? ORDER BY created_at ASC`;
    let values = [id];

    if (limit && page) {
      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);

      if (
        isNaN(parsedLimit) ||
        isNaN(parsedPage) ||
        parsedLimit <= 0 ||
        parsedPage <= 0
      ) {
        return res
          .status(400)
          .json({ message: "Invalid limit or page number" });
      }

      const offset = (parsedPage - 1) * parsedLimit;
      sql += " LIMIT ? OFFSET ?";
      values.push(parsedLimit, offset);
    }

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found in this category!" });
      }
      return res.status(200).json({ products: result });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// SEARCH FOR PRODUCT BY NAME
export const searchForProductByName = (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: "Product name is required!" });
  }
  try {
    const sql = "select * from products where name = ?";
    db.query(sql, [name], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Product name not found!" });
      }
      return res.status(200).json({ products: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// DELETE PRODUCT
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  try {
    const sql = "delete from products where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found!" });
      }
      return res.status(200).json({ message: "Product deleted successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};
