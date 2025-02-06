import db from "../config/db.js";

// CREATE COUPON
export const createCoupon = (req, res) => {
  const {
    id,
    code,
    discount_percentage,
    valid_from,
    valid_until,
    usage_limit,
  } = req.body;
  const values = [
    id,
    code,
    parseFloat(discount_percentage),
    valid_from,
    valid_until,
    parseInt(usage_limit),
  ];
  if (
    !code &&
    !discounte_percentage &&
    !valid_from &&
    !valid_until &&
    !usage_limit
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const sql =
      "insert into coupons(id, code, discount_percentage, valid_from, valid_until, usage_limit) values (?, ?, ?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      return res.status(201).json({ message: "Coupon added successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET ALL COUPONS
export const getAllCoupons = (req, res) => {
  try {
    const sql = "select* from coupons";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Copons not found" });
      }
      return res.status(200).json({ coupons: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// UPDATE COUPON
export const updateCoupon = (req, res) => {
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
    let sql = "update coupons set ";
    let values = [];

    const fields = Object.keys(updates).map((key) => {
      values.push(updates[key]);
      return `${key}= ? `;
    });
    sql += fields.join(", ");
    sql += "where id = ?";
    values.push(id);
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Coupon not found!" });
      }
      return res.status(200).json({ message: "Coupon updated successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// DELETE COUPON
export const deleteCoupon = (req, res) => {
  const { id } = req.params;
  try {
    const sql = "delete from coupons where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Coupon not found!" });
      }
      return res.status(200).json({ message: "Coupon deleted successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};
