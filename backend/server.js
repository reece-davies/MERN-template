import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config(); // loads backend/.env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // no need for deprecated options
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});