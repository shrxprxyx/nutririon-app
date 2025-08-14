import bcrypt from "bcryptjs";
import express from "express";
import pool from "../db.js"; // your PostgreSQL connection

const router = express.Router();

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Check if user exists
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userQuery.rows.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = userQuery.rows[0];

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 3️⃣ Send success response (without showing hashed password)
    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /auth/register
router.post("/register", async (req, res) => {
    try {
      const { phone, username, password } = req.body;
  
      if (!phone || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // 1️⃣ Check if user already exists
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE username = $1 OR phone = $2",
        [username, phone]
      );
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // 2️⃣ Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 3️⃣ Insert new user into database
      const newUser = await pool.query(
        "INSERT INTO users (phone, username, password) VALUES ($1, $2, $3) RETURNING id, username, phone",
        [phone, username, hashedPassword]
      );
  
      res.status(201).json({
        message: "Registration successful",
        user: newUser.rows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default router;

