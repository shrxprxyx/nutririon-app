// server.js
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/NutritionApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
