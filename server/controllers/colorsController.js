import db from "../config/db.js";

// CREATE COLORS
export const createColor = (req, res) => {
  const { id, color } = req.body;
  if (!color) {
    return res.status(400).json({ message: "Field is required!" });
  }
  const sql = "insert into colors(id, color) values (?, ?)";
  db.query(sql, [id, color], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", err });
    }
    return res.status(200).json({ message: "Color added successfully!" });
  });
};

// GET ALL COLORS
export const getAllColors = (req, res) => {
  const sql = "select * from colors";
  db.query(sql, (err, result) => {
    if (err) {
      return res.staus(500).json({ message: "Database error: ", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Colors not found!" });
    }
    return res.status(200).json({ colors: result });
  });
};

// UPDATE COLOR
export const updateColor = (req, res) => {
  const { id, color } = req.body;
  if (!color) {
    return res.status(400).json({ message: "Field is required!" });
  }
  const sql = "update colors set color = ? where id = ?";
  db.query(sql, [color, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error: ", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Color not found" });
    }
    return res.status(200).json({ message: "Color updated successfully!" });
  });
};

// DELETE COLOR
export const deleteColor = (req, res) => {
  const { id } = req.params;
  const sql = "delete from colors where id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error: ", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Color not found!" });
    }
    return res.status(200).json({ message: "Color deleted successfully!" });
  });
};
