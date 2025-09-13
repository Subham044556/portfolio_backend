import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Message } from "./src/models/message.model.js";
import connectDB from "./src/db/db.js";
import dotenv from "dotenv"


dotenv.config({
    path:'./.env'
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

//DB connection
connectDB()

// Routes
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.post("/api/contact",async (req, res) => {
  const { name, email, message } = req.body;

  // ✅ Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(200).json({ message: "Message saved successfully." });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use("/api/contact",contactRoutes);

