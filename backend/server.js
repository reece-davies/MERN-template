import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/items", itemRoutes);

// connect to DB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));