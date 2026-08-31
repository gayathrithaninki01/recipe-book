# 🍳 Personal Recipe Book

A full-stack recipe management app built with **React**, **Node.js/Express**, and **MongoDB**.

## Project Structure
```
recipe-book/
├── backend/      ← Express REST API + MongoDB
└── frontend/     ← React (Vite) UI
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local install or MongoDB Atlas)

---

### 1. Backend Setup
```bash
cd backend
npm install
```

Edit `.env` if needed:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/recipe-book
```

Start the backend:
```bash
npm run dev       # development (nodemon)
# or
npm start         # production
```

API runs at: `http://localhost:5000`

---

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:3000`

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/recipes` | List recipes (supports `?search=&category=`) |
| `GET` | `/api/recipes/:id` | Get a single recipe |
| `POST` | `/api/recipes` | Create recipe (multipart/form-data) |
| `PUT` | `/api/recipes/:id` | Update recipe (multipart/form-data) |
| `DELETE` | `/api/recipes/:id` | Delete recipe |
| `GET` | `/api/recipes/categories` | Get all categories |

### POST / PUT Body (form-data)
| Field | Type | Required |
|-------|------|----------|
| `title` | string | ✅ |
| `category` | string | ✅ |
| `ingredients` | JSON string (array) | — |
| `steps` | JSON string (array) | — |
| `image` | file | — |
| `imageUrl` | string | — |

---

## 🗂️ Categories
Main Dishes, Side Dishes, Appetizers, Soups & Stews, Salads, Breakfast, Desserts, Baked Goods, Snacks, Beverages, Other

---

## ✨ Features
- **Add / Edit / Delete** recipes via modal form
- **Search** by recipe name or ingredient
- **Filter** by category tabs
- **Image upload** (file or URL)
- **Dynamic** ingredients and steps fields
- **Responsive** grid layout
