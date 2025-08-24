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
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")

    // Start server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));