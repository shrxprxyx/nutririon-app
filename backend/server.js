import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import multer from "multer"; // for handling file uploads
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use("/auth", authRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// ---------- New: Scan / Analyze endpoint ----------
const storage = multer.memoryStorage(); // store uploaded images in memory
const upload = multer({ storage });

// Mock AI analysis function (replace with your trained model logic)
async function analyzeImage(buffer) {
  // buffer contains the image bytes
  return {
    calories: 250,
    protein: "10g",
    carbs: "30g",
    fat: "12g",
    healthScore: 75,
    suggestions: ["Drink water", "Add more vegetables"],
  };
}

// Endpoint to receive photo and return AI analysis
app.post("/api/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const result = await analyzeImage(req.file.buffer);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error analyzing image" });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
