import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);