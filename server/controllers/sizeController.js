import db from "../config/db.js";

// CREATE SIZES
export const createSize = (req, res) => {
  const { id, size } = req.body;
  if (!size) {
    return res.status(400).json({ message: "Field is required!" });
  }
  const sql = "insert into sizes(id, size) values (?, ?)";
  db.query(sql, [id, size], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", err });
    }
    return res.status(200).json({ message: "Size added successfully!" });
  });
};

// GET ALL SIZES
export const getAllSizes = (req, res) => {
  const sql = "select * from sizes";
  db.query(sql, (err, result) => {
    if (err) {
      return res.staus(500).json({ message: "Database error: ", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Sizes not found!" });
    }
    return res.status(200).json({ sizes: result });
  });
};

// UPDATE SIZE
export const updateSize = (req, res) => {
  const { id, size } = req.body;
  if (!size) {
    return res.status(400).json({ message: "Field is required!" });
  }
  const sql = "update sizes set size = ? where id = ?";
  db.query(sql, [size, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error: ", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Size not found" });
    }
    return res.status(200).json({ message: "Size updated successfully!" });
  });
};

// DELETE SIZE
export const deleteSize = (req, res) => {
  const { id } = req.params;
  const sql = "delete from sizes where id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error: ", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Size not found!" });
    }
    return res.status(200).json({ message: "Size deleted successfully!" });
  });
};
