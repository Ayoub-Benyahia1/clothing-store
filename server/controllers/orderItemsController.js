import db from "../config/db.js";

// CREATE ORDER ITEM
export const createOrderItem = (req, res) => {
  const { id, order_id, product_id, color_id, size_id, quantity, price } =
    req.body;
  if (
    !order_id ||
    !product_id ||
    !color_id ||
    !size_id ||
    !quantity ||
    !price
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const sql =
      "insert into order_items(id, order_id, product_id, color_id, size_id, quantity, price) values(?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [id, order_id, product_id, color_id, size_id, quantity, price],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database error: ", err });
        }
        return res.status(201).json({ message: "Order items added successfully!" });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET ALL ORDER ITEMS
export const getAllOrderItems = (req, res) => {
  try {
    const sql = "select * from order_items";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Order items not found!" });
      }
      return res.status(200).json({ order_items: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET ORDER ITEMS BY ID
export const getOrderItemsById = (req, res) => {
  const { id } = req.params;
  try {
    const sql = "select * from order_items where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Order items not found!" });
      }
      return res.status(200).json({ order_items: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// DELETE ORDER
export const deleteOrderItems = (req, res) => {
  const { id } = req.params;
  try {
    const sql = "delete from order_items where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order items not found!" });
      }
      return res.status(200).json({ message: "Order items deleted successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};
