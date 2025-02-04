import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

//REGISTER USER
export const register = async (req, res) => {
  const { id, name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "insert into users (id, name, email, password) values (?, ?, ?, ?)";
    db.query(sql, [id, name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      return res.status(201).json({ message: "User registred successfuly!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const sql = "select id, name, password, role from users where name = ?";
    db.query(sql, [name], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error: ", err });
      }
      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials!" });
      }
      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid name or password!" });
      }
      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "2d" }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      const { password: userPassword, id, ...userData } = user;
      return res
        .status(200)
        .json({ message: "Login successful!", accessToken, user: userData });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: ", error });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully!" });
};

