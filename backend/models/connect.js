import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://shri:shri2007@cluster0.y3o3xqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); 
  }
}
