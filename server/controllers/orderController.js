import db from "../config/db.js";

// CREATE ORDER
export const createOrder = (req, res) => {
  const { id, user_id, total_price, status } = req.body;
  if (!user_id || !total_price) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const sql =
      "insert into orders(id, user_id, total_price) values(?, ?, ?)";
    db.query(sql, [id, user_id, total_price], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      return res.status(201).json({ message: "Order added successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET ALL ORDERS
export const getAllOrders = (req, res) => {
  try {
    const sql = "select * from orders";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Orders not found!" });
      }
      return res.status(200).json({ orders: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET ORDER BY ID
export const getOrderById = (req, res) => {
  const { id } = req.params;
  try {
    const sql = "select * from orders where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Order not found!" });
      }
      return res.status(200).json({ order: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// UPDATE STATUS ORDER
export const updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Field is required!" });
  }
  try {
    const sql = "update orders set status = ? where id = ?";
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order not found!" });
      }
      return res.status(200).json({ message: "Status updated successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// DELETE ORDER
export const deleteOrder = (req, res) => {
  const { id } = req.params;
  try {
    const sql = "delete from orders where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order not found!" });
      }
      return res.status(200).json({ message: "Order deleted successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};
