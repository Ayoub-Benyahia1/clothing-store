import db from "../config/db.js";

// CREATE PAYEMENTS
export const createPayements = (req, res) => {
  const { id, order_id, user_id, payment_method, status, transaction_id } =
    req.body;
  if (!order_id || !user_id || !payment_method || !status) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const sql =
      "insert into payments(id, order_id, user_id, payment_method, status, transaction_id) values(?,?,?,?,?,?)";
    db.query(
      sql,
      [id, order_id, user_id, payment_method, status, transaction_id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database error: ", err });
        }
        return res
          .status(201)
          .json({ message: "Payements added successfully!" });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: ", error });
  }
};

// GET ALL PAYEMENTS
export const getAllPayements = (req, res) => {
  try {
    const sql =
      "select p.*, o.total_price, u.name, u.email, u.phone from payments p join orders o on o.id = p.order_id join users u on u.id = p.user_id";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Payements not found!" });
      }
      return res.status(200).json({ payements: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: ", error });
  }
};
