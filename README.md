# MERN-template Guide
Template for a MERN stack application (MongoDB, Express, React, Node). Documented with steps required to make it from scratch

## Project Structure
```
MERN-template/
│
├── README.md
├── .gitignore
│
├── frontend/          # React app (Vite)
│   ├── src/
│   ├── package.json
│   └── .env
│
└── backend/           # Express + MongoDB
    ├── controllers/
    │   └── itemController.js
    ├── models/
    │   └── itemModel.js
    ├── routes/
    │   └── itemRoutes.js
    ├── middleware/    # (empty for now, ready for future)
    ├── server.js
    ├── package.json
    └── .env
```

## Step 0. Repository admin
Create GitHub repo

Install Node.js

Create README.md & .gitignore

## Step 1. Initialise backend

```bash
# make backend folder
mkdir backend && cd backend

# initialize Node.js backend
npm init -y

# install backend dependencies
npm install express mongoose cors dotenv nodemon
```

1. express - web framework for building the API routes

2. mongoose – ODM (object data modeling) library to interact with MongoDB

3. cors – middleware to allow requests from the frontend (different origin)

4. dotenv – loads environment variables (like DB connection string) from .env

5. nodemon – dev tool that auto-restarts the server when code changes

Update package.json scripts (backend) for dev and add type "module":
```json
"type": "module",
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## Step 2. Create backend files
server.js
```javascript
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
```

routes/itemRoutes.js
```javascript
import express from "express";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
```

controllers/itemController.js
```javascript
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
```

models/itemModel.js
```javascript
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
```

## Step 3. Set up environment variables
backend/.env
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Step 4. Set up frontend with Vite
Make frontend directory in root:
```
cd ..
mkdir frontend && cd frontend
npm create vite@latest .   # choose React
npm install
```

## Step 5. (Optional) Create VITE environment variables
backend/.env
```
VITE_API_URL=https://<your-codespace-id>-5000.app.github.dev
```

Dotenv does not need to be installed to the frontend as Vite has built-in environment variable support.

Vite only exposes variables prefixed with VITE_ to your frontend code.

Any variable without VITE_ will not be included in the compiled JavaScript.

## Step 6. Update React App.jsx functionality
frontend/src/App.jsx
```javascript
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // get backend URL from Vite env
  const apiUrl = import.meta.env.VITE_API_URL;

  // fetch all items on load
  useEffect(() => {
    console.log(apiUrl);
    fetch(`${apiUrl}/api/items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err.message));
  }, [apiUrl]);

  // handle form submit (add new item)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = { name, description };

    try {
      const res = await fetch(`${apiUrl}/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Failed to add item");

      const savedItem = await res.json();

      // update state to show new item immediately
      setItems((prev) => [...prev, savedItem]);

      // reset form
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Items</h1>

      {/* Form to add new item */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      {/* List all items */}
        {items.map((i) => (
          <p key={i._id}> {i.name} – {i.description} </p>
        ))}
    </div>
  );
}

export default App;
```

React app now runs GET request (& contains form to run POST request) to backend API

## Step 7. Run both servers
Open two terminals:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

Note: if running backend from GitHub Codespace, the port needs to be set to public