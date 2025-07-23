import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
});

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI; // ✅ Fetch from .env
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI not defined in .env file");

    }
    console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
