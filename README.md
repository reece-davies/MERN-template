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

``` bash
# make backend folder
mkdir backend && cd backend

# initialize Node.js backend
npm init -y

# install backend dependencies
npm install express mongoose cors dotenv nodemon
```

express - web framework for building the API routes
mongoose – ODM (object data modeling) library to interact with MongoDB
cors – middleware to allow requests from the frontend (different origin)
dotenv – loads environment variables (like DB connection string) from .env
nodemon – dev tool that auto-restarts the server when code changes

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
PENDING
```

routes/itemRoutes.js
```javascript
PENDING
```

controllers/itemController.js
```javascript
PENDING
```

models/itemModel.js
```javascript
PENDING
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

## Step 5. (Optional) Create VITE .env
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
PENDING
```

React app now runs GET request (& contains form to run POST request) to backend API

## Step 7. Run both servers in Codespace
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