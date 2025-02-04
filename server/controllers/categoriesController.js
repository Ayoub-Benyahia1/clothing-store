import db from "../config/db.js";

// CREATE CATEGORIE
export const createCategorie = (req, res) => {
  const { id, name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Categorie name is required!" });
  }
  try {
    const sql = "insert into categories (id, name) values (?, ?)";
    db.query(sql, [id, name], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      return res.status(201).json({ message: "Categorie added!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// GET ALL CATEGORIES
export const getAllCategories = (req, res) => {
  try {
    const sql = "select * from categories";
    db.query(sql, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      return res.status(200).json({ categories: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// UPDATE CATEGORIE (PATCH)
export const updateCategorie = (req, res) => {
  const { id, name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Categorie name is required!" });
  }
  try {
    const sql = "update categories set name = ? where id = ?";
    db.query(sql, [name, id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categorie not found!" });
      }
      return res.status(201).json({ message: "Categorie updated!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

//DELETE CATEGORIE
export const deleteCategorie = (req, res) => {
  const { id } = req.params;
  try {
    const sql = "delete from categories where id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error: ", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categorie not found!" });
      }
      return res.status(200).json({ message: "Categorie deleted!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};
