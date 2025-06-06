## 🔧 Backend Project Setup Guide

### 📁 1. Clone the Repository

```bash
git clone https://github.com/Sahil3M3/Book-Review-Platform.git
cd Book-Review-Platform
cd Backend
```

---

### 📦 2. Install Dependencies

```bash
npm install
```

---

### ⚙️ 3. Create `.env` File

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bookDB?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

---

### ▶️ 4. Run the Server

```bash
npm start
```

By default, the server will run on `http://localhost:5000`.

---

## 🔑 Authentication & Admin

### 🧍 Register a Normal User

**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

---

### 👑 Register an Admin

**POST** `/api/auth/register`

```json
{
  "name": "Sahil Meshram",
  "email": "sahil@example.com",
  "password": "123",
  "isAdmin": true
}
```

---

### 🔐 Login

**POST** `/api/auth/login`

```json
{
  "email": "sahil@example.com",
  "password": "123"
}
```

> ✅ Response includes JWT token to be used in protected routes as a Bearer token.

---

## 📘 Book Management  (Admin Only for Create/Update/Delete) (Use Postman)

### ➕ Add a Single Book

**POST** `/api/books` (Admin only, include JWT token)

```json
{
  "title": "Deep Work",
  "author": "Cal Newport",
  "genre": "Productivity",
  "description": "Rules for focused success in a distracted world.",
  "publishedYear": 2016,
  "image": "https://images-na.ssl-images-amazon.com/images/I/81nDW-gHo+L.jpg"
}

```

---

### 📚 Add Multiple Books

**POST** `/api/books/bulk` (Admin or authenticated user)

Send an **array** of books:

```json
[
  {
    "title": "The Psychology of Money",
    "author": "Morgan Housel",
    "genre": "Finance",
    "description": "Timeless lessons on wealth, greed, and happiness.",
    "publishedYear": 2020,
    "coverImage": "https://images-na.ssl-images-amazon.com/images/I/81H9kFQK-hL.jpg"
  },
  {
    "title": "Deep Work",
    "author": "Cal Newport",
    "genre": "Productivity",
    "description": "Rules for focused success in a distracted world.",
    "publishedYear": 2016,
    "coverImage": "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg"
  }
]
```

---

---

## 🎨 Frontend Project Setup Guide (React)

### 📁 1. Clone the Repository

```bash
git clone https://github.com/Sahil3M3/Book-Review-Platform.git
cd Book-Review-Platform
cd Frontend
```

---

### 📦 2. Install Dependencies

```bash
npm install
```

---

### ⚙️ 3. Create `.env` File

Create a `.env` file in the root directory with the following content:

```env
PORT=5000
```

> 🔁 You can also add environment variables like the backend API URL:

```env
VITE_PORT=5000
```

---

### ▶️ 4. Run the React App

```bash
npm start
---
