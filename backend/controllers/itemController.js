import Item from "../models/itemModel.js";

// @desc Get all items
export const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// @desc Get single item
export const getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

// @desc Create item
export const createItem = async (req, res) => {
  const newItem = new Item(req.body);
  const saved = await newItem.save();
  res.status(201).json(saved);
};

// @desc Update item
export const updateItem = async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Item not found" });
  res.json(updated);
};

// @desc Delete item
export const deleteItem = async (req, res) => {
  const deleted = await Item.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item removed" });
};