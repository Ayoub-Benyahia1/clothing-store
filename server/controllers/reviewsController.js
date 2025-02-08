import db from "../config/db.js";

// CREATE REVIEW
export const createReview = (req, res) => {
  const { id, user_id, product_id, rating, comment } = req.body;
  if (!id || !user_id || !product_id || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const sql =
      "insert into reviews(id, user_id, product_id, rating, comment) values(?,?,?,?,?)";
    db.query(sql, [id, user_id, product_id, rating, comment], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      return res.status(201).json({ message: "Review added successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Intenal server error: ", error });
  }
};

// GET ALL REVIEWS
export const getAllReviews = (req, res) => {
  try {
    const sql =
      "select r.*,u.name,p.name,p.price,c.name from reviews r join users u on u.id = r.user_id join products p on p.id = r.product_id join categories c on c.id = p.category_id";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Reviews not found!" });
      }
      return res.status(200).json({ reviews: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: ", error });
  }
};

// GET REVIEW BY ORDER_ITEMS ID (FOR CUSTMER DETAILS)
export const getReviewById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id is required!" });
  }
  try {
    const sql =
      "select r.*,u.name,p.name from reviews r join users u on u.id = r.user_id join products p on p.id = r.product_id where r.id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Reviews not found!" });
      }
      return res.status(200).json({ reviews: result });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: ", error });
  }
};
